import { Response } from 'express';

export function isResponder(e: any): e is Responder {
  return e && typeof (e as Responder).respond === 'function';
}

// TODO: find a way to ensure static variables
// export interface ApiObject {
//   new (): Responder;
//   status: string;
//   code: number;
//   respond(): void;
// }

export interface Responder {
  res: Response;
  respond(): void;
}
