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
  clientId: {
    doc: "Client ID of your Spotify's application.",
    format: String,
    default: 'none',
    env: 'CLIENT_ID',
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
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' });

export default config;
