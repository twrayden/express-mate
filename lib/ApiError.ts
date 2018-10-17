import * as express from 'express';
import * as HTTPStatus from 'http-status';

export class ApiError {
  protected message: string;
  protected code: number;
  protected data: any;

  private res: express.Response;

  /**
   * API Error
   * @constructor
   * @param message
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
      code: this.code,
      data: this.data
    });
  }

  public print(): void {
    // logger.error(this.message);
  }
}
