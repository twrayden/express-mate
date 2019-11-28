import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder } from './Responder';

export interface IFailData {
  [key: string]: string;
}

export class ApiFail implements Responder {
  public static status: string = 'fail';
  public static code: number = HTTPStatus.BAD_REQUEST;

  public static respond(res: Response, data?: IFailData) {
    const instance = new ApiFail(res, data);
    instance.respond();
  }

  private data: IFailData;

  public res: Response;

  constructor(res: Response, data: IFailData = {}) {
    this.data = data;
    this.res = res;
  }

  public respond() {
    this.res.status(ApiFail.code).json({
      status: ApiFail.status,
      data: this.data
    });
  }
}
