import * as express from 'express';

import { ApiSuccess } from './ApiSuccess';
import { ApiError } from './ApiError';

export function isApiObject(
  e: ApiSuccess | ApiError | Error
): e is ApiSuccess | ApiError {
  return e && typeof (e as ApiSuccess | ApiError).end === 'function';
}

export function isApiError(e: ApiSuccess | ApiError): e is ApiError {
  return e && typeof (e as ApiError).print === 'function';
}

/**
 * Custom handler resolver to support promises
 */
export const step = (
  handler: express.RequestHandler
): express.RequestHandler => (req, res, next) =>
  Promise.resolve(handler(req, res, next))
    .then((result: ApiSuccess | ApiError) => {
      if (isApiObject(result)) {
        if (isApiError(result)) {
          next(result);
        } else {
          result.end();
        }
      }
    })
    .catch(next);

export const steps = (handlers: Array<express.RequestHandler>) =>
  handlers.map(step);
