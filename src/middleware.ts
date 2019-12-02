import { Router, RequestHandler, ErrorRequestHandler } from 'express';
import debug from 'debug';

const log = debug('express-mate:middleware');

import { ApiError, isApiError, lazyError } from './ApiError';
import { isResponder, Responder } from './Responder';

export interface ErrorHandlerOptions {
  wrapErrors?: boolean;
  jsend?: boolean;
}

export function errorHandler(
  opt: ErrorHandlerOptions = {}
): ErrorRequestHandler {
  return (err, req, res, next) => {
    const { wrapErrors = true, jsend = true } = opt;

    if (!res.headersSent) {
      let responder: Responder | undefined;

      if (isApiError(err)) {
        log('Caught ApiError: %s', err.stack);

        responder = err;
      } else if (wrapErrors) {
        if (lazyError(err)) {
          log('Caught native error: %s', err.stack);

          responder = new ApiError(res, err);
        } else if (typeof err === 'string') {
          log('Caught native error: %s', err);

          responder = new ApiError(res, err);
        }
      }

      if (isResponder(responder)) {
        if (jsend) {
          responder.jsend();
        } else {
          responder.raw();
        }
      }
    }

    return next(err);
  };
}

export interface HandlerOptions {
  throwErrors?: boolean;
  jsend?: boolean;
}

export function createHandler(
  action: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const { throwErrors = false, jsend = true } = opt;

  return (req, res, next) => {
    Promise.resolve(action(req, res, next))
      .then(result => {
        if (throwErrors === true && lazyError(result)) {
          return Promise.reject(result);
        } else if (isResponder(result)) {
          if (!res.headersSent) {
            log('Responded with responder: %s', result.constructor.name);

            if (jsend) {
              return result.jsend();
            } else {
              return result.raw();
            }
          }
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
