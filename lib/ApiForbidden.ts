import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiForbidden extends ApiError {
  /**
   * Api Forbidden
   * @constructor
   * @param res
   */
  constructor(res: any) {
    super(res);
    this.message = 'Access denied';
    this.code = HTTPStatus.FORBIDDEN;
  }
}
