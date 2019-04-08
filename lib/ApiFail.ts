import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiFail extends ApiError {
  protected static status = 'bad request';
  protected static code = HTTPStatus.BAD_REQUEST;
  /**
   * Api Fail
   * @constructor
   * @param res
   * @param message
   */
}
