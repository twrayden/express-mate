import * as express from 'express';
import * as HTTPStatus from 'http-status';

export class ApiSuccess {
  public static respond(res: express.Response, data?: any): void {
    res.status(HTTPStatus.OK).json({
      status: 'success',
      data
    });
  }

  private res: express.Response;

  protected code: number = HTTPStatus.OK;
  protected data: any;

  /**
   * Api Success
   * @constructor
   * @param message
   * @param data
   */
  constructor(res: express.Response, data?: any) {
    this.res = res;
    this.data = data;
  }

  public end(): void {
    if (!this.res.headersSent) {
      this.res.status(this.code).json({
        status: 'success',
        data: this.data
      });
    }
  }
}
