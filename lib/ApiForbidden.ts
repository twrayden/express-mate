import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiForbidden extends ApiError {
  protected static status: string = 'forbidden';
  protected static code: number = HTTPStatus.FORBIDDEN;
  /**
   * Api Forbidden
   * @constructor
   * @param res
   */
  protected init() {
    super.init({ message: 'Access denied' });
  }
}
