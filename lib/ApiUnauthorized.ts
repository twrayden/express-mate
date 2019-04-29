import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiUnauthorized extends ApiError {
  protected static status: string = 'unauthenticated';
  protected static code: number = HTTPStatus.UNAUTHORIZED;
  protected message = 'Authentication required';
  /**
   * Api Unauthorized
   * @constructor
   * @param res
   */
}
