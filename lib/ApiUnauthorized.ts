import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiUnauthorized extends ApiError {
  public static status: string = 'unauthenticated';
  public static code: number = HTTPStatus.UNAUTHORIZED;
  protected message = 'Authentication required';
  /**
   * Api Unauthorized
   * @constructor
   * @param res
   */
}
