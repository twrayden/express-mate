import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiUnauthorized extends ApiError {
  /**
   * Api Unauthorized
   * @constructor
   * @param res
   */
  constructor(res: express.Response) {
    super(res);
    this.message = 'Authentication required';
    this.code = HTTPStatus.UNAUTHORIZED;
  }
}
