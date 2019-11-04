import express from 'express';
import debug from 'debug';

const log = debug('express-mate:error');

import { ApiError } from './ApiError';
import { isApiObject } from './ApiObject';

export interface ErrorHandlerOptions {}

export function errorHandler(
  options: ErrorHandlerOptions = {}
): express.ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    if (isApiObject(err)) {
      return err.respond();
    } else {
      const e = new ApiError(res, err);
      log('%O', e.message);
      return e.respond();
    }
  };
}
