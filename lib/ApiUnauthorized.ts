import { Response } from 'express';
import HTTPStatus from 'http-status';

import { ApiObject } from './ApiObject';

export class ApiUnauthorized extends ApiObject {
  protected static _status: string = 'error';
  protected static _code: number = HTTPStatus.UNAUTHORIZED;

  public static respond(res: Response, message?: string) {
    const instance = new ApiUnauthorized(res, message);
    instance.respond();
  }

  private message: string;

  constructor(res: Response, message: string = 'Unauthorized.') {
    super(res);
    this.message = message;
  }

  public respond() {
    this.res
      .status(ApiUnauthorized.code)
      .json({ status: ApiUnauthorized.status, message: this.message });
  }
}
