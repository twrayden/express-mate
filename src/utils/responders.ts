import { Response } from 'express';

import { ResponderParser, Responder } from '../internals/Responder';

/**
 * createResponder
 *
 * Responder factory function to create custom responders to use inside express-mate handlers.
 * @param name
 * @param parser
 * @param status
 */
export function createResponder<TBody = any>(
  name: string,
  parser: ResponderParser<TBody>,
  status: number
) {
  return class CustomResponder<TValue = any> extends Responder {
    public static respond<TValue = any>(res: Response, value: TValue) {
      return super.respond(res, value, status, name, parser);
    }

    constructor(res: Response, value: TValue) {
      super(res, value, status, name, parser);
    }
  };
}

/**
 * isResponder
 *
 * Type guard to check if value passed is an instanceof Responder
 * @param responder
 */
export function isResponder(responder: any): responder is Responder {
  return responder && typeof (responder as Responder).trigger === 'function';
}

// Specify internals to export
export { ResponderParser } from '../internals/Responder';
