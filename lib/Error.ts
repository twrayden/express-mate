import * as express from 'express';

import { ApiError } from './ApiError';

/**
 * Last chain of resistance for handling error responses.
 */
export const handleError = (res: express.Response) => (
  error: ApiError | Error
) => {
  if (error instanceof Error) {
    const err = new ApiError(res, error);
    err.end();
    err.print();
  } else if (error && error.end) {
    error.end();
  } else {
    res.sendStatus(500);
  }
};
