import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiNotFound extends ApiError {
  public static status: string = 'not found';
  public static code: number = HTTPStatus.NOT_FOUND;
  /**
   * Api Not Found
   * @constructor
   * @param res
   * @param message
   */
}
