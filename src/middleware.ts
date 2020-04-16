import {
  Router,
  RequestHandler,
  ErrorRequestHandler,
  RouterOptions,
} from 'express';
import debug from 'debug';

const baseLogger = debug('express-mate:middleware');

import { wrapError, isApiError } from './ApiError';
import { isResponder, triggerResponder } from './Responder';
import { Settings, BaseOptions } from './settings';

export interface ErrorHandlerOptions extends BaseOptions {
  wrapErrors?: boolean;
}

export function errorHandler(
  opt: ErrorHandlerOptions = {}
): ErrorRequestHandler {
  const log = baseLogger.extend('errorHandler');
  return (error, _, res, next) => {
    const {
      wrapErrors = false,
      responseFormat = Settings.responseFormat,
    } = opt;
    try {
      if (!res.headersSent) {
        if (isApiError(error)) {
          log('caught error responder');
          return triggerResponder(error, responseFormat); // Stop middleware because ApiError is express-mate exclusive
        } else if (wrapErrors) {
          log('caught error');
          log('attempting to wrap error: %', error);
          const wrap = wrapError(res, error);
          if (wrap) {
            log('successfully wrapped error');
            triggerResponder(wrap, responseFormat); // Don't stop middleware
          } else {
            log('failed to wrap error');
          }
        }
      } else {
        log('headers already sent, ignoring errors');
      }
    } catch (err) {
      log('error occurred whilst processing error: %s', err.stack);
    }
    return next(error);
  };
}

export interface HandlerOptions extends BaseOptions {}

export function createHandler(
  action: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const { responseFormat = Settings.responseFormat } = opt;
  const log = baseLogger.extend('createHandler');
  return (req, res, next) => {
    Promise.resolve(action(req, res, next))
      .then((result) => {
        try {
          if (!res.headersSent) {
            if (isResponder(result)) {
              log('captured responder');
              return triggerResponder(result, responseFormat);
            }
          } else {
            log('headers already sent, ignoring responders');
          }
        } catch (err) {
          log('error occurred whilst processing request result: %s', err.stack);
        }
      })
      .catch((err) => {
        log('caught error');
        return next(err);
      });
  };
}

export interface HookOptions {
  routerOptions?: RouterOptions;
}

export type HookCallback = (router: Router, root: Router) => any;
export type HookFunction = (root: Router) => any;

export function createHook(
  path: string,
  cb: HookCallback,
  opt: HookOptions = {}
): HookFunction {
  return (root: Router) => {
    const router = Router(opt.routerOptions);

    cb(router, root);

    root.use(path, router);
  };
}
