// eslint-disable-next-line
export const encodeBase64 = (clientId, clientSecret) => Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export const spotifyFetcher = (fetch, logger) => async (uri, method, headers = {}, body, auth) =>
  fetch(uri, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      authorization: `Basic ${auth}`,
      ...headers,
    },
    body,
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      logger.info('Data fetched');
      return response.json();
    })
    .catch(err => {
      logger.error(err);
    });
