import Koa from 'koa';

import config from './config';
import logger from './logger';

const port = config.get('port');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello world';
});

app.listen(port, () => {
  logger.info(`Server started on http://localhost:${port}`);
});
