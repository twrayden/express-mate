import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, RespondOptions } from './Responder';
import { Settings } from './settings';

export class ApiSuccess implements Responder {
  public static status: string = 'success';
  public static code: number = HTTPStatus.OK;

  public static respond(res: Response, data?: any, opt: RespondOptions = {}) {
    const { jsend = Settings.jsend, meta } = opt;
    const instance = new ApiSuccess(res, data, meta);
    if (jsend) {
      instance.jsend();
    } else {
      instance.raw();
    }
  }

  private data: any;

  public meta: any;
  public res: Response;

  constructor(res: Response, data?: any, meta: any = {}) {
    this.data = data;
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiSuccess.status;
  }

  public get code() {
    return ApiSuccess.code;
  }

  public raw() {
    return this.res.status(this.code).json(this.data);
  }

  public jsend() {
    this.res.status(this.code).json({
      ...this.meta,
      status: this.status,
      data: this.data
    });
  }
}
