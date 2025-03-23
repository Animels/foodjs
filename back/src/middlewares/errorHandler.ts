import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  console.log(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = JSON.stringify(err.meta?.target);
      res.sendResponse(false, null, `A ${field} with such values already exists`, 400);
      return;
    }

    if (err.code === 'P2003') {
      res.sendResponse(false, null, `Key constraint violation for ${err.meta?.field_name}`, 400);
      return;
    }

    if (err.code === 'P2025') {
      res.sendResponse(false, null, `Did not find such ${err.meta?.modelName}`, 400);
      return;
    }
  }

  res.sendResponse(false, null, `Some error happened`, 400);
};
