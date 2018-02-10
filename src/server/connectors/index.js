import fetch from 'isomorphic-fetch';
import logger from '../../logger';

import { baseUrl, authorizationTokenURI, clientId, clientSecret } from '../../config';
import { encodeBase64, spotifyFetcher } from '../../utils';

export default async (path, context, method = 'GET', body = {}) => {
  const { accessToken, refreshToken } = context;

  const res = await spotifyFetcher(fetch, logger)(`${baseUrl}${path}`, method, {}, body, `Bearer ${accessToken}`);

  if (res.error && res.error.status === 401) {
    logger.info('Access_token has expired');
    // eslint-disable-next-line
    const { access_token } = await spotifyFetcher(fetch, logger)(
      authorizationTokenURI,
      'POST',
      {},
      `grant_type=refresh_token&refresh_token=${refreshToken}`,
      encodeBase64(clientId, clientSecret),
    );

    logger.info('Setting new cookie for access_token');
    context.cookies.set('access_token', access_token); // eslint-disable-line

    // eslint-disable-next-line
    const newRes = spotifyFetcher(fetch, logger)(`${baseUrl}${path}`, method, {}, body, `Bearer ${access_token}`);
    return newRes;
  }
  return res;
};
