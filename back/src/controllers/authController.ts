import { RegisterBody } from '@models';
import { decodeToken, extractTokens, generateAccToken, generateRefToken } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { authRepository, tokenRepository } from 'src/repository/index.js';

export const register = async (req: RegisterBody, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  try {
    await authRepository.createUser(email, password);
    res.json({
      success: true,
      message: 'User created successfully!',
    });
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
      console.log(user);
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

          res.status(200).json({
            success: true,
            message: 'You are logged in!',
          });
        } catch (e) {
          next(e);
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'User passwords do not match!',
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
      message: `Email or password is not provided!`,
    });
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
          res.json({
            success: true,
            message: 'You are logged in!',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'Failed to find refreshToken',
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

export const check = async (req: Request, res: Response, next: NextFunction) => {
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
      message: 'No tokens are provided',
    });
    return;
  }

  try {
    let decoded = decodeToken(accessToken, 'access') ?? decodeToken(refreshToken, 'refresh');
    await tokenRepository.deleteExpiredUserTokens(decoded.id);
    const userTokens = await tokenRepository.getUserTokens(decoded.id);

    res.status(200).json({ message: userTokens.some((t) => t.acessToken === accessToken) });
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
