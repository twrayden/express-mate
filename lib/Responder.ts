import { Response } from 'express';

export function isResponder(e: any): e is Responder {
  return (
    e &&
    typeof (e as Responder).jsend === 'function' &&
    typeof (e as Responder).raw === 'function'
  );
}

export interface RespondOptions {
  meta?: any;
  jsend?: boolean;
}

// TODO: find a way to ensure static variables
// export interface ApiObject {
//   new (): Responder;
//   status: string;
//   code: number;
//   jsend(): void;
// }

export interface Responder {
  code: number;
  status: string;
  res: Response;
  meta: any;
  raw(): void;
  jsend(): void;
}
