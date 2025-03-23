import { RegisterBody } from '@models';
import { decodeToken, extractTokens, generateAccToken, generateRefToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { authRepository, tokenRepository } from 'src/repository/index.js';

export const register = async (req: RegisterBody, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.sendResponse(false, null, 'Email and password are required.', 400);
  }

  try {
    await authRepository.createUser(email, password);
    res.sendResponse(true, {});
  } catch (err) {
    next(err);
  }
};

export const login = async (req: RegisterBody, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user = null;
  if (email && password) {
    try {
      user = await authRepository.findUser({ email });
    } catch (e) {
      next(e);
    }

    if (user) {
      if (user.password === password) {
        try {
          let accessToken = generateAccToken(user.id, user.password);
          let refreshToken = generateRefToken(user.id, user.password);

          await tokenRepository.deleteExpiredUserTokens(user.id);
          const tokenInfo = await tokenRepository.createToken(user.id, accessToken, refreshToken);

          res.cookie('Auth-token', tokenInfo.acessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires: tokenInfo.acessExpiresAt,
          });
          res.cookie('Refresh-token', tokenInfo.refreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            expires: tokenInfo.refreshExpiresAt,
          });

          res.sendResponse(true, {});
        } catch (e) {
          next(e);
        }
      } else {
        res.sendResponse(false, null, 'User passwords do not match!', 400);
      }
    }
  } else {
    res.sendResponse(false, null, `Email or password is not provided!`, 400);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const refreshToken = req.refreshToken;
  const { redirect } = req.query;

  try {
    if (user) {
      const tokens = await tokenRepository.getUserTokens(user.id);
      const token = tokens.find((token) => token.refreshToken === refreshToken);

      let newAccessToken = generateAccToken(user.id, user.password);
      let newRefreshToken = generateRefToken(user.id, user.password);

      if (token) {
        const tokenInfo = await tokenRepository.updateUserToken(token.id, newAccessToken, newRefreshToken);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.cookie('Auth-token', tokenInfo.acessToken, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          expires: tokenInfo.acessExpiresAt,
        });
        res.cookie('Refresh-token', tokenInfo.refreshToken, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          expires: tokenInfo.refreshExpiresAt,
        });

        if (redirect) {
          res.redirect(decodeURIComponent(redirect as string));
        } else {
          res.sendResponse(true, {});
        }
      } else {
        res.sendResponse(false, {}, 'Failed to find refreshToken', 400);
      }
    }
  } catch (e) {
    next(e);
  }
};

export const check = async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers?.authorization || req.headers?.cookie;

  if (!authHeader) {
    res.sendResponse(false, null, 'Unauthorized!', 401);
    return;
  }

  const tokens = extractTokens(authHeader);
  const accessToken = tokens['Auth-token'];
  const refreshToken = tokens['Refresh-token'];

  if (!accessToken && !refreshToken) {
    res.sendResponse(false, {}, 'No tokens are provided', 400);
    return;
  }

  try {
    let decoded = decodeToken(accessToken, 'access') ?? decodeToken(refreshToken, 'refresh');
    await tokenRepository.deleteExpiredUserTokens(decoded.id);
    const userTokens = await tokenRepository.getUserTokens(decoded.id);

    res.sendResponse(true, { message: userTokens.some((t) => t.acessToken === accessToken) });
  } catch (e) {
    next(e);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('Auth-token', { path: '/' });
    res.clearCookie('Refresh-token', { path: '/' });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
