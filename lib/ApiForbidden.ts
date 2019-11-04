import { Response } from 'express';
import HTTPStatus from 'http-status';

import { ApiObject } from './ApiObject';

export class ApiForbidden extends ApiObject {
  protected static _status: string = 'error';
  protected static _code: number = HTTPStatus.FORBIDDEN;

  public static respond(res: Response, message?: string) {
    const instance = new ApiForbidden(res, message);
    instance.respond();
  }

  private message: string;

  constructor(res: Response, message: string = 'Insufficient permissions.') {
    super(res);
    this.message = message;
  }

  public respond() {
    this.res.status(ApiForbidden.code).json({
      status: ApiForbidden.status,
      message: this.message
    });
  }
}
