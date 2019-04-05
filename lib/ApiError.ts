import * as express from 'express';
import * as HTTPStatus from 'http-status';
import * as winston from 'winston';

export class ApiError {
  public static respond(
    res: express.Response,
    data?: any,
    code: 500 | 400 | 404 | 401 | 403 = HTTPStatus.INTERNAL_SERVER_ERROR
  ): void {
    res.status(code).json({
      status: 'error',
      data
    });
  }

  protected message: string;
  protected code: number;
  protected data: any;

  private res: express.Response;

  /**
   * Api Error
   * @constructor
   * @param res
   * @param error
   */
  constructor(res: express.Response, error: Error);
  constructor(res: express.Response, message?: string, data?: any);
  constructor() {
    this.res = arguments[0];
    if (arguments[1] instanceof Error) {
      this.message = arguments[1].message;
    } else {
      this.message = arguments[1];
      this.data = arguments[2];
    }
    this.code = HTTPStatus.INTERNAL_SERVER_ERROR;
  }

  public end(): void {
    this.res.status(this.code).json({
      status: 'error',
      message: this.message,
      data: this.data
    });
  }

  public print(): void {
    winston.error(this.message);
  }
}
