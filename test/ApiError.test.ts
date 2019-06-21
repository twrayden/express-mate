import { ApiUnauthorized } from '../lib/ApiUnauthorized';

const mockRequest = () => {
  return {};
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('Throw Unauthorized w/ message', () => {
  const res = mockResponse();
  const message = 'This is a test message.';
  const instance = new ApiUnauthorized(res, message);
  expect(instance['message']).toBe(message);
});
