import { Response } from 'express';
import { ApiFail } from '../src/ApiFail';

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockFail = () => {
  return {
    username: 'username cannot be blank',
    password: 'password cannot be blank'
  };
};

test('create ApiFail', () => {
  expect(new ApiFail(mockResponse(), mockFail())).toBeInstanceOf(ApiFail);
});
