import * as express from 'express';

import { handleError } from './Error';
import { ApiSuccess } from './ApiSuccess';

export type IController = (
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) => Promise<any> | any;

/**
 * This function is used to wrap async / await functions and handle any
 * errors that may be thrown by that function. Makes it cleaner than
 * having try / catch blocks throughout the code.
 */
export const step = (controller: IController) => (
  req: express.Request,
  res: express.Response,
  ...args: any[]
) =>
  Promise.resolve(controller(req, res, ...args))
    .then((result: ApiSuccess) => {
      if (result && result.end) {
        result.end();
      } else {
        res.sendStatus(200);
      }
    })
    .catch(handleError(res));

export const steps = (controllers: Array<IController>) => controllers.map(step);
