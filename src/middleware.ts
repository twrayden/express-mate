import {
  Router,
  RequestHandler,
  ErrorRequestHandler,
  RouterOptions,
} from 'express';
import debug from 'debug';

const baseLogger = debug('express-mate:middleware');

import { isResponder } from './utils/responders';
import { Responder } from './internals/Responder';
import { BaseOptions, injectSettings } from './settings';
import { wrapError, isApiError } from './responders/ApiError';

export interface ErrorHandlerOptions extends BaseOptions {}

/**
 *
 * @param opt
 */
export function errorHandler(
  opt: ErrorHandlerOptions = {}
): ErrorRequestHandler {
  return (err, _, res, next) => {
    const { handleErrors, ignoreNativeErrors } = injectSettings(opt);

    const log = baseLogger.extend('errorHandler');

    if (handleErrors) {
      try {
        if (!res.headersSent) {
          let responder: Responder | undefined;

          if (!ignoreNativeErrors) {
            log('caught native error');
            log('attempting to wrap error: %', err);

            const wrap = wrapError(res, err);

            if (isApiError(wrap)) {
              log('successfully wrapped error');

              responder = wrap;
            } else {
              log('failed to wrap error');
            }
          }

          if (isResponder(responder)) {
            return responder.trigger();
          }
        } else {
          log('headers already sent, ignoring errors');
        }
      } catch (_err) {
        log('error occurred whilst processing error: %s', _err.stack);
      }
    } else {
      log('error handling disabled, passing error to next()');

      return next(err);
    }
  };
}

export interface HandlerOptions extends BaseOptions {}

/**
 *
 * @param handler
 * @param opt
 */
export function createHandler(
  handler: RequestHandler,
  opt: HandlerOptions = {}
): RequestHandler {
  const {} = injectSettings(opt);

  const log = baseLogger.extend('createHandler');

  return (req, res, next) => {
    Promise.resolve(handler(req, res, next))
      .then((result) => {
        try {
          if (!res.headersSent) {
            if (isResponder(result)) {
              log('captured responder');

              return result.trigger();
            }
          } else {
            log('headers already sent, ignoring responders');
          }
        } catch (err) {
          log('error occurred whilst processing request result: %s', err.stack);
        }
      })
      .catch((err) => {
        return errorHandler(opt)(err, req, res, next);
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
    const router = Router({ mergeParams: true, ...opt.routerOptions });

    cb(router, root);

    root.use(path, router);
  };
}
