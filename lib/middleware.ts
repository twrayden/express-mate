import { Router, RequestHandler, ErrorRequestHandler } from 'express';
import debug from 'debug';

const log = debug('express-mate:middleware');

import { ApiError, isApiError, lazyError } from './ApiError';
import { isResponder } from './Responder';

export interface ErrorHandlerOptions {
  wrapErrors?: boolean;
}

export function errorHandler(
  opt: ErrorHandlerOptions = {}
): ErrorRequestHandler {
  return (err, req, res, next) => {
    const { wrapErrors = true } = opt;
    if (!res.headersSent) {
      if (isApiError(err)) {
        log('Caught ApiError: %s', err.stack);
        err.respond();
      } else if (wrapErrors) {
        log('Caught native error: %s', err.stack);
        const wrap = new ApiError(res, err);
        wrap.respond();
      }
    }
    return next(err);
  };
}

export interface HandlerOptions {
  throwAllErrors?: boolean;
}

export function createHandler(
  action: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const { throwAllErrors = false } = opt;
  return (req, res, next) => {
    Promise.resolve(action(req, res, next))
      .then(result => {
        if (isResponder(result)) {
          if (isApiError(result) && throwAllErrors) {
            return Promise.reject(result);
          }
          if (!res.headersSent) {
            log('Responded with responder: %s', result.constructor.name);
            return result.respond();
          }
        } else if (lazyError(result)) {
          return Promise.reject(result);
        }
      })
      .catch(next);
  };
}

export type HookCallback = (router: Router, root: Router) => any;
export type HookFunction = (root: Router) => any;

export function createHook(cb: HookCallback): HookFunction;
export function createHook(path: string, cb: HookCallback): HookFunction;
export function createHook(
  pathOrCb: string | HookCallback,
  cb?: HookCallback
): HookFunction {
  return (root: Router) => {
    const router = Router();
    if (typeof pathOrCb === 'string') {
      if (cb) {
        cb(router, root);
      }
      root.use(pathOrCb, router);
    } else {
      pathOrCb(router, root);
    }
  };
}
