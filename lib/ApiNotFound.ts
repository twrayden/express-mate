import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiNotFound extends ApiError {
  protected static status: string = 'not found';
  protected static code: number = HTTPStatus.NOT_FOUND;
  /**
   * Api Not Found
   * @constructor
   * @param res
   * @param message
   */
}
