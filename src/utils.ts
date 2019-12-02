export interface CheckReqOptions {
  strict?: boolean;
  error?: string;
}

export function checkReq<T = any>(
  key: string,
  req: any,
  opt: CheckReqOptions = {}
): T {
  const { strict = true, error } = opt;

  if (req && req[key]) {
    return req[key];
  } else {
    if (strict !== false) {
      if (typeof error === 'string') {
        throw new Error(error);
      } else {
        throw new Error(`req.${key} not found when expected`);
      }
    } else {
      return undefined as any;
    }
  }
}
