import { gotServer } from 'got-test';

import app from './';

jest.mock('../logger', () => ({
  info: jest.fn(),
}));

const request = server => gotServer(server);

describe('app', () => {
  let server;

  afterEach(done => {
    server.close(done);
  });

  it('has code 200', async () => {
    server = await app();
    const res = await request(server).get('/');

    expect(res.statusCode).toEqual(200);
  });
});
