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
  constructor(res: express.Response, message: string) {
    super(res);
    this.message = message;
    this.code = HTTPStatus.BAD_REQUEST;
  }
}
