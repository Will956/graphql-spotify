import { authorizationTokenURI } from '../config';
// eslint-disable-next-line
export const encodeBase64 = (clientId, clientSecret) =>
  `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

export const spotifyFetcher = (fetch, logger) => async (uri, method, headers = {}, body, auth) => {
  let contentType = 'application/json';

  if (uri === authorizationTokenURI) {
    contentType = 'application/x-www-form-urlencoded';
  }

  return fetch(uri, {
    method,
    headers: {
      'Content-Type': contentType,
      authorization: auth,
      ...headers,
    },
    body,
  })
    .then(response => {
      if (!response.ok) {
        logger.error(response.statusText);
        return response.json();
      }
      logger.info('Data fetched');
      return response.json();
    })
    .catch(err => {
      logger.error(err);
    });
};
