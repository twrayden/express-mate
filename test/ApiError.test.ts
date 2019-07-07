import { ApiUnauthorized } from '../lib/ApiUnauthorized';
import { handleError } from '../lib/Error';
import { Request, Response, NextFunction } from 'express';

const mockError = (): Error => {
  return new Error('This is a test error.');
};

const mockRequest = (): Request => {
  return {} as Request;
};

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = (): NextFunction => {
  return () => {};
};

function throwError() {
  throw mockError();
}

test('Handle thrown error', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = mockNext();
  handleError(req, res, next)(mockError());
});

test('Unauthorized w/ message', () => {
  const res = mockResponse();
  const message = 'This is a test message.';
  const instance = new ApiUnauthorized(res, message);
  expect(instance['message']).toBe(message);
});