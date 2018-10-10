import * as express from 'express';

import { handleError } from './Error';
import { ApiSuccess } from './ApiSuccess';

/**
 * This function is used to wrap async / await functions and handle any
 * errors that may be thrown by that function. Makes it cleaner than
 * having try / catch blocks throughout the code.
 */
export const step = (
  controller: (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
  ) => Promise<any>
) => (req: express.Request, res: express.Response, ...args: any[]) =>
  controller(req, res, ...args)
    .then((result: ApiSuccess) => {
      if (result && result.respond) {
        result.respond();
      }
    })
    .catch(handleError(res));

export const steps = (
  controllers: Array<
    (
      req: express.Request,
      res: express.Response,
      ...args: any[]
    ) => Promise<any>
  >
) => controllers.map(step);
