import * as express from 'express';
import * as HTTPStatus from 'http-status';
import * as winston from 'winston';
export class ApiError {
  // @ts-ignore
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

  protected message: string | undefined = undefined;
  protected data: any = undefined;
  protected sterilized: { message?: string; data?: any };

  /**
   * Api Error
   * @constructor
   * @param res
   * @param error
   */
  constructor(res: express.Response, error?: Error);
  constructor(res: express.Response, message?: string);
  constructor(res: express.Response) {
    this.res = res;
    this.sterilized = { message: this.message, data: this.data };
    this.sterilizeArg(arguments[1]);
    this.init({ message: 'There was an unknown error on the server.' });
  }

  protected sterilizeArg(arg: Error | string | undefined | null) {
    if (arg instanceof Error) {
      this.sterilized = {
        ...this.sterilized,
        data: arg,
        message: arg.message
      };
    } else if (typeof arg === 'string') {
      this.sterilized = { ...this.sterilized, message: arg };
    } else if (arg) {
      this.sterilized = {
        ...this.sterilized,
        data: arg
      };
    }
  }

  protected init(defaults: { data?: any; message?: string }) {
    const { data, message } = this.sterilized;
    this.data = data ? data : defaults.data;
    this.message = message ? message : defaults.message;
  }

  public end(): void {
    if (!this.res.headersSent) {
      const code = this.constructor.code;
      const status = this.constructor.status;
      this.res.status(code).json({
        status,
        message: this.message,
        data: this.data
      });
    }
  }

  public print(): void {
    if (this.message) {
      winston.error(JSON.stringify(this.message));
    }
  }
}
