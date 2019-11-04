import { Response } from 'express';
import HTTPStatus from 'http-status';
import { types } from 'util';

import { ApiObject } from './ApiObject';

export function isApiError(e: ApiObject): e is ApiError {
  return e && (e as ApiError).hasOwnProperty('stack');
}

export class ApiError extends ApiObject {
  protected static _status: string = 'error';
  protected static _code: number = HTTPStatus.INTERNAL_SERVER_ERROR;

  public static respond(res: Response, error?: Error): void;
  public static respond(res: Response, message?: string): void;
  public static respond(res: Response, data?: any): void {
    const instance = new ApiError(res, data);
    instance.respond();
  }

  private error: Error;

  constructor(res: Response, error?: Error);
  constructor(res: Response, message?: string);
  constructor(res: Response, data?: any) {
    super(res);
    this.error = this.toError(data);
  }

  private toError(data?: any): Error {
    if (data) {
      if (types.isNativeError(data)) {
        return data;
      } else if (typeof data === 'string') {
        return new Error(data);
      }
    }
    return new Error('Unknown error occurred.');
  }

  public get stack() {
    return this.error.stack;
  }

  public get message() {
    return this.error.message;
  }

  public respond() {
    this.res.status(ApiError.code).json({
      status: ApiError.status,
      message: this.error.message
    });
  }
}
