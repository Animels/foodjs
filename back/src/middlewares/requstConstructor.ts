import { RequestHandler } from 'express';

export const requestConstructor: RequestHandler = (req, res, next): void => {
  res.sendResponse = <T>(success: boolean, data?: T, message = '', statusCode = 200) => {
    res.status(statusCode).json({
      success,
      ...(data ? { data } : {}),
      ...(message ? { message } : {}),
    });
  };
  next();
};
