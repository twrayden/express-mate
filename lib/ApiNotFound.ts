import * as HTTPStatus from 'http-status';

import { ApiError } from './ApiError';

export class ApiNotFound extends ApiError {
  /**
   * API Not Found
   * @constructor
   * @param message
   */
  constructor(res: any, message?: string) {
    super(res, message);
    this.code = HTTPStatus.NOT_FOUND;
  }
}
