import { Response } from 'express';
import debug from 'debug';

const log = debug('express-mate:responder');

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
  log('triggering responder: %s', responder.constructor.name);
  if (isResponder(responder)) {
    switch (responseFormat) {
      case 'jsend': {
        return responder.jsend();
      }
      case 'none': {
        return responder.raw();
      }
      default: {
        return responder.raw();
      }
    }
  }
}
