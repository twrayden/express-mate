import { Response } from 'express';
import { ApiForbidden } from '../src/ApiForbidden';

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockMessage = () => {
  return 'You must be an admin to access this resource';
};

test('create ApiForbidden', () => {
  expect(new ApiForbidden(mockResponse(), mockMessage())).toBeInstanceOf(
    ApiForbidden
  );
});
