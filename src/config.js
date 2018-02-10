import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  spotifyApi: {
    baseUrl: {
      doc: 'Base URL for Spotify API',
      format: String,
      default: 'https://api.spotify.com/v1',
      env: 'BASE_URL',
    },
    authorizationCodeURI: {
      doc: 'Authorization Code URI',
      format: String,
      default: 'https://accounts.spotify.com/authorize?response_type=code',
      env: 'AUTHORIZATION_CODE_URI',
    },
    authorizationTokenURI: {
      doc: 'Get token',
      format: String,
      default: 'https://accounts.spotify.com/api/token',
      env: 'AUTHORIZATION_TOKEN_URI',
    },
    clientId: {
      doc: "Client ID of your Spotify's application.",
      format: String,
      default: 'none',
      env: 'CLIENT_ID',
    },
    clientSecret: {
      doc: "Client Secret of your Spotify's application.",
      format: String,
      default: 'none',
      env: 'CLIENT_SECRET',
    },
    redirectUri: {
      doc: 'The URI to redirect to after the user grants or denies permission.',
      format: String,
      default: 'http://localhost/callback',
      env: 'REDIRECT_URI',
    },
    scope: {
      doc: 'A space-separated list of scopes.',
      format: String,
      default: 'user-read-private',
      env: 'SCOPE',
    },
  },
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' });

export const port = config.get('port');
export const baseUrl = config.get('spotifyApi.baseUrl');
export const authorizationCodeURI = config.get('spotifyApi.authorizationCodeURI');
export const authorizationTokenURI = config.get('spotifyApi.authorizationTokenURI');
export const clientId = config.get('spotifyApi.clientId');
export const clientSecret = config.get('spotifyApi.clientSecret');
export const scope = config.get('spotifyApi.scope');
export const redirectUri = config.get('spotifyApi.redirectUri');

export default config;
