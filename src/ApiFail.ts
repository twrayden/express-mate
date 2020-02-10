import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, RespondOptions } from './Responder';
import { Settings } from './settings';

export interface IFailData {
  [key: string]: string;
}

export class ApiFail implements Responder {
  public static status: string = 'fail';
  public static code: number = HTTPStatus.BAD_REQUEST;

  public static respond(
    res: Response,
    data?: IFailData,
    opt: RespondOptions = {}
  ) {
    const { jsend = Settings.jsend, meta } = opt;
    const instance = new ApiFail(res, data, meta);
    if (jsend) {
      instance.jsend();
    } else {
      instance.raw();
    }
  }

  private data: IFailData;

  public meta: any;
  public res: Response;

  constructor(res: Response, data: IFailData = {}, meta: any = {}) {
    this.data = data;
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiFail.status;
  }

  public get code() {
    return ApiFail.code;
  }

  public raw() {
    this.res.status(this.code).json(this.data);
  }

  public jsend() {
    this.res.status(this.code).json({
      ...this.meta,
      status: this.status,
      data: this.data
    });
  }
}
