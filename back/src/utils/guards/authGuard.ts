import { NextFunction, Request, Response } from 'express';
import { authRepository, tokenRepository } from 'src/repository/index.js';

import { extractTokens } from '../extractTokens.js';
import { decodeToken } from '../generateToken.js';

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers?.authorization || req.headers?.cookie;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized!',
    });
    return;
  }
  const tokens = extractTokens(authHeader);
  const accessToken = tokens['Auth-token'];
  const refreshToken = tokens['Refresh-token'];

  if (!accessToken && !refreshToken) {
    res.status(401).json({
      success: false,
      message: 'No tokens were provided',
    });
    return;
  }

  console.log(accessToken);
  console.log(refreshToken);

  if (req.path === '/refresh') {
    try {
      const decoded = decodeToken(refreshToken, 'refresh');
      await tokenRepository.deleteExpiredUserTokens(decoded.id);
      const userTokens = await tokenRepository.getUserTokens(decoded.id);

      if (userTokens.some((t) => t.refreshToken === refreshToken)) {
        req.user = await authRepository.findUser({
          id: decoded.id,
        });
        req.refreshToken = refreshToken;
        next();
      } else {
        res.status(401).json({ message: `Invalid or unknown refresh token` });
      }
    } catch (e) {
      next(e);
    }
    return;
  }

  try {
    const decoded = decodeToken(accessToken, 'access');
    const userTokens = await tokenRepository.getUserTokens(decoded.id);

    if (userTokens.some((t) => t.acessToken === accessToken)) {
      req.user = await authRepository.findUser({
        id: decoded.id,
      });
      next();
    } else {
      res.status(401).json({ message: `Invalid or unknown access token` });
    }
  } catch (e) {
    res.redirect(`/auth/refresh?redirect=${encodeURIComponent(req.originalUrl)}`);
  }
  return;
};
