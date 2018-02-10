import middleware from './spotifyAuth';

jest.mock('../../utils', () => ({
  spotifyFetcher: jest.fn(() => () => Promise.resolve({ access_token: '1234', refresh_token: '4567' })),
  encodeBase64: jest.fn(() => 'id:secret'),
}));

jest.mock('../../logger', () => ({
  error: jest.fn(),
}));

describe('Spotify authentification middleware', () => {
  const ctx = {
    query: {
      code: '1234',
      state: '4567',
    },
    cookies: {
      get: jest.fn(() => '4567'),
      set: jest.fn(),
    },
    state: {
      initialState: undefined,
    },
    redirect: jest.fn(),
  };
  const noop = () => {};
  const next = jest.fn();

  it('check if state equals to initialState', async () => {
    await middleware(noop)(ctx, next);

    expect(ctx.cookies.get).toHaveBeenCalledWith('state');
    expect(ctx.state.initialState).toBe('4567');
    expect(ctx.query.state).toEqual(ctx.state.initialState);
    expect(ctx.redirect).toHaveBeenCalled();
  });

  it('sets access and refresh tokens', async () => {
    await middleware(noop)(ctx, next);

    expect(ctx.cookies.set).toHaveBeenCalledWith('access_token', '1234');
    expect(ctx.cookies.set).toHaveBeenCalledWith('refresh_token', '4567');
    expect(ctx.redirect).toHaveBeenCalled();
  });

  it("throws error if state doesn't equal to initialState", async () => {
    ctx.query.state = 'wrong state';
    await middleware(noop)(ctx, next);

    expect(ctx.query.state).not.toEqual(ctx.state.initialState);
    expect(ctx.redirect).toHaveBeenCalled();
  });
});
