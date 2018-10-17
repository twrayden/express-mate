import * as express from 'express';
import * as HTTPStatus from 'http-status';

export class ApiSuccess {
  public static respond(res: express.Response, data: any): void {
    res.status(HTTPStatus.OK).json({
      status: 'success',
      data
    });
  }

  protected code: number;
  protected data: any;

  private res: express.Response;

  /**
   * API Error
   * @constructor
   * @param message
   */
  constructor(res: express.Response, data?: any) {
    this.res = res;
    this.code = HTTPStatus.OK;
    this.data = data;
  }

  public end(): void {
    this.res.status(this.code).json({
      status: 'success',
      data: this.data
    });
  }
}
