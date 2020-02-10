export interface CheckReqOptions {
  strict?: boolean;
  customError?: string;
}

export function checkReq<T = any>(
  key: string,
  req: any,
  opt: CheckReqOptions = {}
): T {
  const { strict = true, customError } = opt;

  if (req && req[key]) {
    return req[key];
  } else {
    if (strict !== false) {
      if (typeof customError === 'string') {
        throw new Error(customError);
      } else {
        throw new Error(`req.${key} not found when expected`);
      }
    } else {
      return undefined as any;
    }
  }
}
