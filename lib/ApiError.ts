import * as express from 'express';
import * as HTTPStatus from 'http-status';
import * as winston from 'winston';
export class ApiError {
  'constructor': typeof ApiError;
  protected static status: string = 'error';
  protected static code: number = HTTPStatus.INTERNAL_SERVER_ERROR;

  public static respond(res: express.Response, data?: Error | string): void {
    if (data instanceof Error) {
      res.status(this.code).json({
        status: this.status,
        message: data.message,
        data
      });
    } else if (typeof data === 'string') {
      res.status(this.code).json({
        status: this.status,
        message: data
      });
    } else {
      res.status(this.code).json({
        status: this.status,
        data
      });
    }
  }

  private res: express.Response;

  protected message: string;
  protected data: any;

  /**
   * Api Error
   * @constructor
   * @param res
   * @param error
   */
  constructor(res: express.Response, error?: Error);
  constructor(res: express.Response, message?: string);
  constructor() {
    this.res = arguments[0];
    if (arguments[1] instanceof Error) {
      this.message = arguments[1].message;
      this.data = arguments[1];
    } else if (typeof arguments[1] === 'string') {
      this.message = arguments[1];
    } else {
      this.data = arguments[1];
      this.message = 'There was an unknown error on the server.';
    }
  }

  public end(): void {
    this.res.status(this.constructor.code).json({
      status: this.constructor.status,
      message: this.message,
      data: this.data
    });
  }

  public print(): void {
    winston.error(this.message);
  }
}
