import { Response } from 'express';
import { ApiError } from '../src/ApiError';

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockMessage = () => {
  return 'Unable to connect to database';
};

test('create ApiError', () => {
  expect(new ApiError(mockResponse(), mockMessage())).toBeInstanceOf(ApiError);
});
