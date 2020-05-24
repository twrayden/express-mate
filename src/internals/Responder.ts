import { Response } from "express";
import debug from "debug";

const log = debug('express-mate:responder');

export type ResponderParser<TBody = any> = (value: any) => TBody;

export class Responder<TBody = any, TValue = any> {
  public static respond<TBody = any, TValue = any>(
    res: Response,
    value: TValue,
    status: number,
    name: string,
    parser: ResponderParser<TBody>
  ) {
    return new Responder(res, value, status, name, parser).trigger();
  }

  public res: Response;
  public value: TValue;
  public status: number;
  public name: string;
  public parser: ResponderParser<TBody>;

  constructor(
    res: Response,
    value: TValue,
    status: number,
    name: string,
    parser: ResponderParser<TBody>
  ) {
    this.res = res;
    this.value = value;
    this.status = status;
    this.name = name;
    this.parser = parser;
  }

  public trigger() {
    log('triggering responder: %s', this.name);
    const body = this.parser(this.value);
    return this.res.status(this.status).json(body);
  }
}
