import * as express from 'express';
import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiForbidden extends ApiError {
  public static status: string = 'forbidden';
  public static code: number = HTTPStatus.FORBIDDEN;
  protected message = 'Access denied';
  /**
   * Api Forbidden
   * @constructor
   * @param res
   */
}
