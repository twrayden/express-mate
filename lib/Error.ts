import * as express from 'express';

import { ApiError } from './ApiError';

/**
 * Last chain of resistance for handling error responses.
 */
export const handleError = (
  res: express.Response,
  req: express.Request,
  next: express.NextFunction
) => (error: ApiError | Error) => {
  if (!res.headersSent) {
    if (error instanceof Error) {
      const e = new ApiError(res, error);
      e.print();
      e.end();
    } else if (error && error.end) {
      error.end();
    }
  }
};
