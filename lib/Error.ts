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
    if (isApiObject(err) && isApiError(err)) {
      if (options.print) {
        err.print();
      }
      err.end();
    }
  };
}
