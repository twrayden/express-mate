import * as express from 'express';

import { ApiError } from './ApiError';

/**
 * Last chain of resistance for handling error responses.
 */
export const handleError: express.RequestHandler = (req, res, next) => (
  error: ApiError | Error
) => {
  if (!res.headersSent) {
    if (error instanceof Error) {
      const e = new ApiError(res, error);
      e.print();
      e.end();
    } else if (error && typeof error.end === 'function') {
      error.end();
    }
  }
  next(error);
};
