import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = JSON.stringify(err.meta?.target);
      res.status(400).json({
        success: false,
        message: `A ${field} with such values are already exist`,
      });
    }

    if (err.code === 'P2003') {
      res.status(400).json({
        success: false,
        message: `Key constrains violation for ${err.meta?.field_name}`,
      });
    }

    if (err.code === 'P2025') {
      res.status(400).json({
        success: false,
        message: `Did not found such ${err.meta?.modelName}`,
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: `Some error happened`,
    });
  }
};
