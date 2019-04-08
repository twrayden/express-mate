import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiForbidden extends ApiError {
  protected static status: string = 'forbidden';
  protected static code: number = HTTPStatus.FORBIDDEN;
  protected message = 'Access denied';
  /**
   * Api Forbidden
   * @constructor
   * @param res
   */
}
