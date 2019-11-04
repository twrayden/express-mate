import { Response } from 'express';
import HTTPStatus from 'http-status';

import { ApiObject } from './ApiObject';

export class ApiSuccess extends ApiObject {
  protected static _status: string = 'success';
  protected static _code: number = HTTPStatus.OK;

  public static respond(res: Response, data?: any) {
    const instance = new ApiSuccess(res, data);
    instance.respond();
  }

  private data: any;

  constructor(res: Response, data?: any) {
    super(res);
    this.data = data;
  }

  public respond() {
    this.res.status(ApiSuccess.code).json({
      status: ApiSuccess.status,
      data: this.data
    });
  }
}
