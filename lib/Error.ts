import { ApiError } from './ApiError';

/**
 * Last chain of resistance for handling error responses.
 */
export const handleError = (res: any) => (error: ApiError | Error) => {
  if (error instanceof ApiError) {
    error.respond();
  }
  if (error instanceof Error) {
    const err = new ApiError(res, error);
    err.respond();
    err.print();
  }
};
