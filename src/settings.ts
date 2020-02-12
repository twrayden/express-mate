export interface ResponseFormats {
  jsend?: string;
  none?: string;
}

export type ResponseFormat = keyof ResponseFormats;

export interface BaseOptions {
  responseFormat?: ResponseFormat;
  respondErrors?: boolean;
}

let responseFormat: ResponseFormat = 'none';
let respondErrors: boolean = false;

export class Settings {
  /**
   * responseFormat
   */
  public static get responseFormat() {
    return responseFormat;
  }

  public static set responseFormat(value: ResponseFormat) {
    responseFormat = value;
  }

  /**
   * respondErrors
   */
  public static get respondErrors() {
    return respondErrors;
  }

  public static set respondErrors(value: boolean) {
    respondErrors = value;
  }
}
