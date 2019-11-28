export interface CheckReqOptions {
  strict?: boolean;
}

export function checkReq<T = any>(
  key: string,
  req: any,
  opt: CheckReqOptions = {}
): T {
  const { strict = true } = opt;
  if (req && req[key]) {
    return req[key];
  } else {
    if (strict !== false) {
      throw new Error(`req.${key} not found when expected`);
    } else {
      return undefined as any;
    }
  }
}
