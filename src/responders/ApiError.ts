import { Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";

import { isResponder } from "../utils/responders";
import { Responder } from "../internals/Responder";
import { isNativeError } from "../utils/errors";

const ApiErrorName = "ApiError";

const ApiErrorParser = (message: string) => { return { status: 'error', message } };

export class ApiError extends Responder {
  constructor(res: Response, message: string) {
    super(res, message, INTERNAL_SERVER_ERROR, ApiErrorName, ApiErrorParser);
  }
}

/**
 * isApiError
 * 
 * 
 * @param responder 
 */
export function isApiError(responder: any): responder is typeof ApiError {
  return isResponder(responder) && responder.name === ApiErrorName;
}

/**
 * wrapError
 * 
 * Turn native Error into ApiError responder
 * 
 * @param error 
 */
export function wrapError(res: Response, error: Error | string): ApiError {
  const err = typeof error === "string" ? new Error(error) : isNativeError(error) ? error : undefined;
  if (!err) {
    throw new Error("Passed invalid error to wrapError function"); 
  }
  const value = err.message;
  return new ApiError(res, value);
}