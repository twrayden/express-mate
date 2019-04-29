import * as express from 'express';

import { ApiSuccess } from './ApiSuccess';
import { ApiError } from './ApiError';

export type IController = (
  req?: express.Request,
  res?: express.Response,
  next?: express.NextFunction
) => Promise<any> | any;

/**
 * Custom handler resolver to support promises
 */
export const step = (controller: IController) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) =>
  Promise.resolve(controller(req, res, next))
    .then((result: ApiSuccess | ApiError) => {
      if (!res.headersSent && result && typeof result.end === 'function') {
        result.end();
      }
    })
    .catch(next);

export const steps = (controllers: Array<IController>) => controllers.map(step);
