import randomString from 'randomstring';

import middleware from './home';

describe('Home middleware', () => {
  const ctx = {
    cookies: {
      get: jest.fn(() => undefined),
      set: jest.fn(() => '1234'),
    },
    state: {
      isAuthorized: undefined,
      stateArg: undefined,
    },
    render: jest.fn(),
  };
  const noop = () => {};
  randomString.generate = jest.fn(() => '1234');

  it('sets isAuthorized to false if there is no tokens', async () => {
    await middleware(noop)(ctx);

    expect(ctx.cookies.get).toHaveBeenCalledWith('access_token');
    expect(ctx.cookies.get).toHaveBeenCalledTimes(1);
    expect(ctx.state.isAuthorized).toBe(false);
  });

  it('sets isAuthorized to true if there is tokens', async () => {
    ctx.cookies.get = jest.fn(() => true);

    await middleware(noop)(ctx);

    expect(ctx.cookies.get).toHaveBeenCalledWith('access_token');
    expect(ctx.cookies.get).toHaveBeenCalledWith('refresh_token');
    expect(ctx.cookies.get).toHaveBeenCalledTimes(2);
    expect(ctx.state.isAuthorized).toBe(true);
  });

  it('sets stateArg to a cookie', async () => {
    await middleware(noop)(ctx);

    expect(randomString.generate).toHaveBeenCalledWith(24);
    expect(ctx.cookies.set).toHaveBeenCalledWith('state', '1234');
    expect(ctx.state.stateArg).toBe('1234');
  });
});
