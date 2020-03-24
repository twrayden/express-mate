import { Response } from 'express';
import HTTPStatus from 'http-status';

import {
  Responder,
  isResponder,
  ResponderOptions,
  triggerResponder
} from './Responder';
import { Settings } from './settings';

export function lazyError(e: any): e is Error {
  return e && typeof e.stack === 'string' && typeof e.message === 'string';
}

export function isApiError(e: any): e is ApiError {
  return lazyError(e) && isResponder(e);
}

export function wrapError(res: Response, err: any): ApiError | undefined {
  if (lazyError(err)) {
    return new ApiError(res, err);
  } else if (typeof err === 'string') {
    return new ApiError(res, err);
  }
  return undefined;
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

  public static respond(
    res: Response,
    error?: Error,
    opt?: ResponderOptions
  ): void;
  public static respond(
    res: Response,
    message?: string,
    opt?: ResponderOptions
  ): void;
  public static respond(
    res: Response,
    data?: any,
    opt: ResponderOptions = {}
  ): void {
    const { responseFormat = Settings.responseFormat, meta } = opt;
    const instance = new ApiError(res, data, meta);
    return triggerResponder(instance, responseFormat);
  }

  public meta: any;
  public res: Response;

  constructor(res: Response, error?: Error, meta?: any);
  constructor(res: Response, message?: string, meta?: any);
  constructor(res: Response, data?: any, meta: any = {}) {
    super(ApiError.getMessage(data));
    Object.setPrototypeOf(this, ApiError.prototype);
    if (lazyError(data)) {
      this.stack = data.stack;
      this.name = data.name;
    }
    this.meta = meta;
    this.res = res;
  }

  public get status() {
    return ApiError.status;
  }

  public get code() {
    return ApiError.code;
  }

  public raw() {
    this.res.status(this.code).send(this.message);
  }

  public jsend() {
    this.res.status(this.code).json({
      ...this.meta,
      status: this.status,
      message: this.message
    });
  }
}
