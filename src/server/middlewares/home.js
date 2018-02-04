import randomString from 'randomstring';

import { authorizationCodeURI, clientId, scope, redirectUri } from '../../config';

export default () => async ctx => {
  const state = randomString.generate(24);
  const isAuthorized = !!(ctx.cookies.get('access_token') && ctx.cookies.get('refresh_token'));
  ctx.cookies.set('state', state);

  ctx.state = {
    isAuthorized,
    stateArg: state,
  };

  return ctx.render('index', {
    title: 'GraphQL layer for Spotify.',
    authorizationCodeUri: `${authorizationCodeURI}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&show_dialog=true`, // eslint-disable-line
    isAuthorized,
  });
};
