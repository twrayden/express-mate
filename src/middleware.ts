import { Router, RequestHandler, ErrorRequestHandler } from 'express';
import debug from 'debug';

const baseLogger = debug('express-mate:middleware');

import { lazyError, wrapError } from './ApiError';
import { isResponder, triggerResponder } from './Responder';
import { ApiSuccess } from './ApiSuccess';
import { Settings, BaseOptions } from './settings';

export interface HandlerOptions extends BaseOptions {}

export function errorHandler(opt: HandlerOptions = {}): ErrorRequestHandler {
  const log = baseLogger.extend('errorHandler');
  return (err, _, res, next) => {
    const {
      respondErrors = Settings.respondErrors,
      responseFormat = Settings.responseFormat
    } = opt;
    log('caught error');
    if (respondErrors) {
      log('attempting to respond error');
      if (!res.headersSent) {
        const error = wrapError(res, err);
        if (error) {
          log('responding error: %', err.stack);
          triggerResponder(error, responseFormat);
        }
      }
    }
    return next(err);
  };
}

export function createHandler(
  action: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const {
    respondErrors = Settings.respondErrors,
    responseFormat = Settings.responseFormat
  } = opt;
  const log = baseLogger.extend('createHandler');
  return (req, res, next) => {
    Promise.resolve(action(req, res, next))
      .then(result => {
        if (lazyError(result)) {
          log('returned error');
          if (respondErrors) {
            log('attempting to respond error');
            if (!res.headersSent) {
              const error = wrapError(res, result);
              if (error) {
                log('responding error: %s', error.stack);
                return triggerResponder(error, responseFormat);
              }
            }
          } else {
            log('throwing error: %s', result.stack);
            return Promise.reject(result);
          }
        } else if (isResponder(result)) {
          log('returned responder');
          if (!res.headersSent) {
            log('triggering responder: %s', result.constructor.name);
            return triggerResponder(result, responseFormat);
          }
        } else {
          log('returned primitive value');
          if (!res.headersSent) {
            log('attempting to wrap value in ApiSuccess');
            const responder = new ApiSuccess(res, result);
            log('triggering responder: %s', responder.constructor.name);
            return triggerResponder(responder, responseFormat);
          }
        }
      })
      .catch(err => {
        log('caught error');
        if (respondErrors) {
          log('attempting to respond error');
          if (!res.headersSent) {
            const error = wrapError(res, err);
            if (error) {
              log('responding error: %s', error.stack);
              return triggerResponder(error, responseFormat);
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
