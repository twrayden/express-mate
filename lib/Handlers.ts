import * as express from 'express';

import { ApiSuccess } from './ApiSuccess';
import { ApiError } from './ApiError';
import { handleError } from './Error';

export function isApiObject(
  e: ApiSuccess | ApiError | Error
): e is ApiSuccess | ApiError {
  return e && e.end && typeof e.end === 'function';
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
        result.end();
      }
    })
    .catch(handleError(req, res, next));

export const steps = (handlers: Array<express.RequestHandler>) =>
  handlers.map(step);
