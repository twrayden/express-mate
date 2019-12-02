import { Response } from 'express';
import { ApiUnauthorized } from '../src/ApiUnauthorized';

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockMessage = () => {
  return 'you must be authenticated to access that route';
};

test('create ApiUnauthorized', () => {
  expect(new ApiUnauthorized(mockResponse(), mockMessage())).toBeInstanceOf(
    ApiUnauthorized
  );
});
