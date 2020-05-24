
export function isNativeError(error: any): error is Error {
  return error && typeof (error as Error).message === "string" && typeof (error as Error).stack === "string";
}