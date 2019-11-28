import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder } from './Responder';

export class ApiForbidden implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.FORBIDDEN;

  public static respond(res: Response, message?: string) {
    const instance = new ApiForbidden(res, message);
    instance.respond();
  }

  private message: string;

  public res: Response;

  constructor(res: Response, message: string = 'Insufficient permissions') {
    this.message = message;
    this.res = res;
  }

  public respond() {
    this.res.status(ApiForbidden.code).json({
      status: ApiForbidden.status,
      message: this.message
    });
  }
}
