export function checkReq<T = any>(
  key: string,
  req: any,
  opt: { strict?: boolean } = {}
): T {
  const { strict = true } = opt;
  if (req && req[key]) {
    return req[key];
  } else {
    if (strict) {
      throw new Error(`req.${key} not found when expected`);
    } else {
      return undefined as any;
    }
  }
}
