import { Router } from 'express';

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

export type HookCallback = (router: Router, root: Router) => any;
export type HookFunction = (root: Router) => any;

export function createHook(cb: HookCallback): HookFunction;
export function createHook(path: string, cb: HookCallback): HookFunction;
export function createHook(
  pathOrCb: string | HookCallback,
  cb?: HookCallback
): HookFunction {
  return (root: Router) => {
    const router = Router();
    if (typeof pathOrCb === 'string') {
      if (cb) {
        cb(router, root);
      }
      root.use(pathOrCb, router);
    } else {
      pathOrCb(router, root);
    }
  };
}
