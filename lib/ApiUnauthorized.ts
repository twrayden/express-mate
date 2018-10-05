import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiUnauthorized extends ApiError {
  /**
   * Api Unauthorized
   * @constructor
   * @param res
   */
  constructor(res: any) {
    super(res);
    this.message = 'Authentication required';
    this.code = HTTPStatus.UNAUTHORIZED;
  }
}
