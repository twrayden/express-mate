import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, ResponderOptions, triggerResponder } from './Responder';
import { Settings } from './settings';

export class ApiForbidden implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.FORBIDDEN;

  public static respond(
    res: Response,
    message?: string,
    opt: ResponderOptions = {}
  ) {
    const { responseFormat = Settings.responseFormat, meta } = opt;
    const instance = new ApiForbidden(res, message, meta);
    return triggerResponder(instance, responseFormat);
  }

  private message: string;

  public meta: any;
  public res: Response;

  constructor(
    res: Response,
    message: string = 'Insufficient permissions',
    meta: any = {}
  ) {
    this.message = message;
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiForbidden.status;
  }

  public get code() {
    return ApiForbidden.code;
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
