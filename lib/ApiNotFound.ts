import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder } from './Responder';

export class ApiNotFound implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.NOT_FOUND;

  public static respond(res: Response, message?: string) {
    const instance = new ApiNotFound(res, message);
    instance.respond();
  }

  private message: string;

  public res: Response;

  constructor(res: Response, message: string = 'Not found') {
    this.message = message;
    this.res = res;
  }

  public respond() {
    this.res.status(ApiNotFound.code).json({
      status: ApiNotFound.status,
      message: this.message
    });
  }
}
