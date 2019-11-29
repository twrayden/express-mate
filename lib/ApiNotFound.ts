import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, RespondOptions } from './Responder';

export class ApiNotFound implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.NOT_FOUND;

  public static respond(
    res: Response,
    message?: string,
    opt: RespondOptions = {}
  ) {
    const { jsend = true, meta } = opt;
    const instance = new ApiNotFound(res, message, meta);
    if (jsend) {
      instance.jsend();
    } else {
      instance.raw();
    }
  }

  private message: string;

  public meta: any;
  public res: Response;

  constructor(res: Response, message: string = 'Not found', meta: any = {}) {
    this.message = message;
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiNotFound.status;
  }

  public get code() {
    return ApiNotFound.code;
  }

  public raw() {
    this.res.status(this.code).send(this.message);
  }

  public jsend() {
    this.res.status(this.code).json({
      ...this.meta,
      status: this.status,
      message: this.message
    });
  }
}
