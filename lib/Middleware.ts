import express from 'express';
import { types } from 'util';
import debug from 'debug';

const log = debug('express-mate:error');

import { ApiError } from './ApiError';
import { ApiSuccess } from './ApiSuccess';

export function isApiObject(
  e: ApiSuccess | ApiError | Error
): e is ApiSuccess | ApiError {
  return e && typeof (e as ApiSuccess | ApiError).end === 'function';
}

export function isApiError(e: ApiSuccess | ApiError): e is ApiError {
  return e && typeof (e as ApiError).stack === 'string';
}

export interface ErrorHandlerOptions {}

export function errorHandler(
  options: ErrorHandlerOptions = {}
): express.ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    let e = err;
    if (!isApiObject(e)) {
      if (types.isNativeError(e)) {
        e = new ApiError(res, e);
      } else {
        e = new ApiError(res, String(e));
      }
    }
    log('%O', err);
    e.end();
  };
}
