import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder } from './Responder';

export class ApiUnauthorized implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.UNAUTHORIZED;

  public static respond(res: Response, message?: string) {
    const instance = new ApiUnauthorized(res, message);
    instance.respond();
  }

  private message: string;

  public res: Response;

  constructor(res: Response, message: string = 'Unauthorized') {
    this.message = message;
    this.res = res;
  }

  public respond() {
    this.res
      .status(ApiUnauthorized.code)
      .json({ status: ApiUnauthorized.status, message: this.message });
  }
}
