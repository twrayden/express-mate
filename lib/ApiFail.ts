import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiFail extends ApiError {
  public static status = 'bad request';
  public static code = HTTPStatus.BAD_REQUEST;
  /**
   * Api Fail
   * @constructor
   * @param res
   * @param message
   */
}
