import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
});

// TODO: create config for each env
// choose default values for the moment.
// const env = config.get('env');
// config.loadFile('./config/' + env + '.json');

config.validate({ allowed: 'strict' });

export default config;
