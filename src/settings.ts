export interface ResponseFormats {
  jsend?: string;
  none?: string;
}

export type ResponseFormat = keyof ResponseFormats;

export interface BaseOptions {
  responseFormat?: ResponseFormat;
  handleErrors?: boolean;
  ignoreNativeErrors?: boolean;
}

let responseFormat: ResponseFormat = 'none';
let handleErrors: boolean = true;
let ignoreNativeErrors: boolean = false;

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
   * handleErrors
   */
  public static get handleErrors() {
    return handleErrors;
  }

  public static set handleErrors(value: boolean) {
    handleErrors = value;
  }

  /**
   * ignoreNativeErrors
   */
  public static get ignoreNativeErrors() {
    return ignoreNativeErrors;
  }

  public static set ignoreNativeErrors(value: boolean) {
    ignoreNativeErrors = value;
  }
}

export function injectSettings(obj: BaseOptions) {
  return { responseFormat, ignoreNativeErrors, handleErrors, ...obj };
}
