// src/types/express.d.ts
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: number;
      name: string | null;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    };
    refreshToken?: string;
  }

  interface Response {
    sendResponse: <T>(success: boolean, data?: T, message?: string, statusCode?: number) => void;
  }
}
