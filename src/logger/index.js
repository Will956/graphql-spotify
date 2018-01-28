import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'GraphQL-Spotify',
  level: 'info',
});

export default logger;
