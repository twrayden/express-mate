export function assertReq<T = any>(
  req: any,
  key: string,
  message?: string
): T | undefined {
  if (req && req[key]) {
    return req[key];
  } else {
    throw new Error(message ? message : `req.${key} undefined when expected`);
  }
}

export function getReq<T = any>(req: any, key: string): T | undefined {
  if (req && req[key]) {
    return req[key];
  } else {
    return undefined;
  }
}

export function setReq<T = any>(req: any, key: string, value: T): T {
  req[key] = value;
  return value;
}
