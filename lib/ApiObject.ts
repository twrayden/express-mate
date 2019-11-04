import { Response } from 'express';

export function isApiObject(e: any): e is ApiObject {
  return e && typeof (e as ApiObject).respond === 'function';
}

export abstract class ApiObject {
  protected static _status: string;
  protected static _code: number;

  public static get status() {
    return this._status;
  }

  public static get code() {
    return this._code;
  }

  protected res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public abstract respond(): void;
}
