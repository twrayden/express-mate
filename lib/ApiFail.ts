import { Response } from 'express';
import HTTPStatus from 'http-status';

import { ApiObject } from './ApiObject';

export interface IFailData {
  [key: string]: string;
}

export class ApiFail extends ApiObject {
  protected static _status: string = 'fail';
  protected static _code: number = HTTPStatus.BAD_REQUEST;

  public static respond(res: Response, data?: IFailData) {
    const instance = new ApiFail(res, data);
    instance.respond();
  }

  private data: IFailData;

  constructor(res: Response, data: IFailData = {}) {
    super(res);
    this.data = data;
  }

  public respond() {
    this.res.status(ApiFail.code).json({
      status: ApiFail.status,
      data: this.data
    });
  }
}
