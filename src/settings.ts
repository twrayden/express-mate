

export interface BaseOptions {
  handleErrors?: boolean;
  ignoreNativeErrors?: boolean;
}

let handleErrors: boolean = true;
let ignoreNativeErrors: boolean = false;

export class Settings {
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
  return { ignoreNativeErrors, handleErrors, ...obj };
}
