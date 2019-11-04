import { Response } from 'express';
import HTTPStatus from 'http-status';

import { ApiObject } from './ApiObject';

export class ApiNotFound extends ApiObject {
  protected static _status: string = 'error';
  protected static _code: number = HTTPStatus.NOT_FOUND;

  public static respond(res: Response, message?: string) {
    const instance = new ApiNotFound(res, message);
    instance.respond();
  }

  private message: string;

  constructor(res: Response, message: string = 'Not found.') {
    super(res);
    this.message = message;
  }

  public respond() {
    this.res.status(ApiNotFound.code).json({
      status: ApiNotFound.status,
      message: this.message
    });
  }
}
