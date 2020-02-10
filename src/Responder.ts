import { Response } from 'express';
import { BaseOptions, ResponseFormat } from './settings';

export function isResponder(e: any): e is Responder {
  return (
    e &&
    typeof (e as Responder).jsend === 'function' &&
    typeof (e as Responder).raw === 'function'
  );
}

export interface ResponderOptions extends BaseOptions {
  meta?: any;
}

export interface Responder {
  code: number;
  status: string;
  res: Response;
  meta: any;
  raw(): void;
  jsend(): void;
}

export function triggerResponder(
  responder: Responder,
  responseFormat?: ResponseFormat
): void {
  if (isResponder(responder)) {
    switch (responseFormat) {
      case ResponseFormat.JSEND: {
        responder.jsend();
      }
      case ResponseFormat.NONE: {
        responder.raw();
      }
      default: {
        responder.raw();
      }
    }
  }
}
