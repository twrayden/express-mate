import express from 'express';
import HTTPStatus from 'http-status';
import { types } from 'util';

export class ApiError {
  protected static status: string = 'error';
  protected static code: number = HTTPStatus.INTERNAL_SERVER_ERROR;

  private static sterilizeArg(
    arg: Error | string | undefined | null,
    defaults: any = {}
  ) {
    if (types.isNativeError(arg)) {
      return {
        ...defaults,
        status: this.status,
        message: arg.message,
        data: arg.stack
      };
    } else if (typeof arg === 'string') {
      return { ...defaults, status: this.status, message: arg };
    } else if (arg) {
      return {
        ...defaults,
        status: this.status,
        data: arg
      };
    }
  }

  public static respond(res: express.Response, data?: Error | string): void {
    res.status(this.code).json(this.sterilizeArg(data));
  }

  private res: express.Response;

  protected message: string | undefined = undefined;
  protected data: any = undefined;
  protected sterilized: { message?: string; data?: any; status?: string };

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
    this.sterilized = ApiError.sterilizeArg(arguments[1], {
      message: this.message,
      data: this.data
    });
    this.init({ message: 'There was an unknown error on the server.' });
  }

  protected init(defaults: { data?: any; message?: string }) {
    const { data, message } = this.sterilized;
    this.data = data ? data : defaults.data;
    this.message = message ? message : defaults.message;
  }

  public end(): void {
    if (!this.res.headersSent) {
      const code = (this.constructor as any).code;
      const status = (this.constructor as any).status;
      this.res.status(code).json({
        status,
        message: this.message,
        data: this.data
      });
    }
  }

  // Used to determine if ApiError obj
  // TODO: find a purpose for this, logging maybe
  public get stack() {
    return '';
  }
}
