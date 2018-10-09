import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiNotFound extends ApiError {
  /**
   * API Not Found
   * @constructor
   * @param message
   */
  constructor(res: express.Response, message?: string) {
    super(res, message);
    this.code = HTTPStatus.NOT_FOUND;
  }
}
