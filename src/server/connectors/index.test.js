import spotifyAPI from './index';
import logger from '../../logger';
import { spotifyFetcher } from '../../utils';

jest.mock('../../utils', () => ({
  spotifyFetcher: jest.fn(() => () => Promise.resolve({ data: true })),
  encodeBase64: jest.fn(() => 'id:secret'),
}));

jest.mock('../../logger', () => ({
  info: jest.fn(),
}));

describe('Connector', () => {
  const path = '/test';
  const context = {
    cookies: {
      get: jest.fn(),
      set: jest.fn(),
    },
    accessToken: '123',
    refreshToken: '456',
  };

  it('returns data if all good', async () => {
    const res = await spotifyAPI(path, context);

    expect(res).toEqual({ data: true });
  });

  it('requests an other token is the previous is invalid', async () => {
    spotifyFetcher
      .mockImplementationOnce(() => () => Promise.resolve({ error: { status: 401 } }))
      .mockImplementationOnce(() => () => Promise.resolve({ access_token: '789' }))
      .mockImplementationOnce(() => () => Promise.resolve({ data: true }));

    const res = await spotifyAPI(path, context);

    expect(logger.info).toHaveBeenCalledWith('Access_token has expired');
    expect(logger.info).toHaveBeenCalledWith('Setting new cookie for access_token');
    expect(context.cookies.set).toHaveBeenCalledWith('access_token', '789');
    expect(res).toEqual({ data: true });
  });
});
