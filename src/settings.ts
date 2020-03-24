export interface ResponseFormats {
  jsend?: string;
  none?: string;
}

export type ResponseFormat = keyof ResponseFormats;

export interface BaseOptions {
  responseFormat?: ResponseFormat;
}

let responseFormat: ResponseFormat = 'none';

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
}
