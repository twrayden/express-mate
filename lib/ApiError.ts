import { Response } from 'express';
import HTTPStatus from 'http-status';

import { Responder, isResponder } from './Responder';

export function lazyError(e: any): e is Error {
  return e && typeof e.stack === 'string' && typeof e.message === 'string';
}

export function isApiError(e: any): e is ApiError {
  return lazyError(e) && isResponder(e);
}

export class ApiError extends Error implements Responder {
  public static status: string = 'error';
  public static code: number = HTTPStatus.INTERNAL_SERVER_ERROR;

  private static getMessage(data?: any) {
    if (lazyError(data)) {
      return data.message;
    } else if (typeof data === 'string') {
      return data;
    } else {
      return 'Unexpected error occurred';
    }
  }

  public static respond(res: Response, error?: Error): void;
  public static respond(res: Response, message?: string): void;
  public static respond(res: Response, data?: any): void {
    const instance = new ApiError(res, data);
    instance.respond();
  }

  public res: Response;

  constructor(res: Response, error?: Error);
  constructor(res: Response, message?: string);
  constructor(res: Response, data?: any) {
    super(ApiError.getMessage(data));
    Object.setPrototypeOf(this, ApiError.prototype);
    if (lazyError(data)) {
      this.stack = data.stack;
      this.name = data.name;
    }
    this.res = res;
  }

  public respond() {
    this.res.status(ApiError.code).json({
      status: ApiError.status,
      message: this.message
    });
  }
}
