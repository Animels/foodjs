import { Request } from 'express';

export type RequestBody<T> = Request<unknown, unknown, T>;

declare module 'express' {
  export interface Request {
    user?: {
      id: number;
      name: string | null;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    };
    refreshToken?: string;
  }
}
