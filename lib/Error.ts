import * as express from 'express';

import { ApiError } from './ApiError';
import { isApiObject } from './Handlers';

export function isError(e: ApiError | Error): e is Error {
  return e && typeof (e as Error).stack === 'string';
}

/**
 * Last chain of resistance for handling error responses.
 */
export const handleError: express.RequestHandler = (req, res, next) => (
  error: ApiError | Error
) => {
  if (isApiObject(error)) {
    error.end();
  } else if (isError(error) || typeof error === 'string') {
    const e = new ApiError(res, error);
    e.print();
    e.end();
    next(error);
  } else {
    next(error);
  }
};
