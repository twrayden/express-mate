import * as express from 'express';

import { ApiError } from './ApiError';
import { isApiObject, isApiError } from './Handlers';

export function isError(e: ApiError | Error): e is Error {
  return e && typeof (e as Error).stack === 'string';
}

export interface ErrorHandlerOptions {
  print?: boolean;
}

export function errorHandler(
  options: ErrorHandlerOptions = {}
): express.ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    let e = err;
    if (!isApiObject(e)) {
      if (isError(e)) {
        e = new ApiError(res, e);
      } else {
        e = new ApiError(res, String(e));
      }
    }
    if (options.print && isApiError(e)) {
      e.print();
    }
    e.end();
  };
}
