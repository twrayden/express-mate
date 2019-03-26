import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiFail extends ApiError {
  /**
   * Api Fail
   * @constructor
   * @param res
   * @param message
   */
  constructor(res: express.Response, message?: string, data?: any) {
    super(res, message, data);
    this.code = HTTPStatus.BAD_REQUEST;
  }
}
