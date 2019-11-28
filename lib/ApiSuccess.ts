import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder } from './Responder';

export class ApiSuccess implements Responder {
  public static status: string = 'success';
  public static code: number = HTTPStatus.OK;

  public static respond(res: Response, data?: any) {
    const instance = new ApiSuccess(res, data);
    instance.respond();
  }

  private data: any;

  public res: Response;

  constructor(res: Response, data?: any) {
    this.data = data;
    this.res = res;
  }

  public respond() {
    this.res.status(ApiSuccess.code).json({
      status: ApiSuccess.status,
      data: this.data
    });
  }
}
