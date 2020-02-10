import { Router, RequestHandler, ErrorRequestHandler, Response } from 'express';
import debug from 'debug';

const log = debug('express-mate:middleware');

import { ApiError, isApiError, lazyError } from './ApiError';
import { isResponder, Responder } from './Responder';
import { ApiSuccess } from './ApiSuccess';
import { Settings } from './settings';

export interface ErrorOptions {
  respond?: boolean;
}

export interface ResponseOptions {
  jsend?: boolean;
}

function respond(responder: Responder, opt: ResponseOptions): void {
  if (isResponder(responder)) {
    log('Responded with responder: %s', responder.constructor.name);

    if (opt.jsend) {
      responder.jsend();
    } else {
      responder.raw();
    }
  }
}

function wrapError(res: Response, err: any): ApiError | undefined {
  if (isApiError(err)) {
    return err;
  } else if (lazyError(err)) {
    log('Caught native error: %s', err.stack);

    return new ApiError(res, err);
  } else if (typeof err === 'string') {
    log('Caught native error: %s', err);

    return new ApiError(res, err);
  }
  return undefined;
}

export interface ErrorHandlerOptions {
  errors?: ErrorOptions;
  response?: ResponseOptions;
}

export function errorHandler(
  opt: ErrorHandlerOptions = {}
): ErrorRequestHandler {
  return (err, _, res, next) => {
    const { errors = {}, response = { jsend: Settings.jsend } } = opt;

    if (errors.respond) {
      if (!res.headersSent) {
        const error = wrapError(res, err);
        if (error) {
          return respond(error, response);
        }
      }
    }
    return next(err);
  };
}

export interface HandlerOptions {
  errors?: ErrorOptions;
  response?: ResponseOptions;
}

export function createHandler(
  action: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const { errors = {}, response = { jsend: Settings.jsend } } = opt;

  return (req, res, next) => {
    Promise.resolve(action(req, res, next))
      .then(result => {
        if (lazyError(result)) {
          if (errors.respond) {
            if (!res.headersSent) {
              const error = wrapError(res, result);
              if (error) {
                return respond(error, response);
              }
            }
          } else {
            return Promise.reject(result);
          }
        } else if (isResponder(result)) {
          if (!res.headersSent) {
            return respond(result, response);
          }
        } else {
          if (!res.headersSent) {
            const responder = new ApiSuccess(res, result);
            return respond(responder, response);
          }
        }
      })
      .catch(err => {
        if (errors.respond) {
          if (!res.headersSent) {
            const error = wrapError(res, err);
            if (error) {
              return respond(error, response);
            }
          }
        }
        return next(err);
      });
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
