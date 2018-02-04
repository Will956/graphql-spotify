import fetch from 'isomorphic-fetch';

import logger from '../../logger';
import { encodeBase64, spotifyFetcher } from '../../utils';
import { authorizationTokenURI, clientId, clientSecret, redirectUri } from '../../config';

export default () => async (ctx, next) => {
  const { code, state } = ctx.query;
  ctx.state.initialState = ctx.cookies.get('state');
  const auth = encodeBase64(clientId, clientSecret);

  if (state === ctx.state.initialState) {
    // eslint-disable-next-line
    const { access_token, refresh_token } = await spotifyFetcher(fetch, logger)(
      authorizationTokenURI,
      'POST',
      {},
      `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      auth,
    );

    ctx.cookies.set('access_token', access_token);
    ctx.cookies.set('refresh_token', refresh_token);
  } else {
    logger.error('Error in state');
  }

  ctx.redirect('/');
  await next();
};
