import Koa from 'koa';
import Router from 'koa-router';

import config from '../config';
import logger from '../logger';

export default async () => {
  const port = config.get('port');

  const app = new Koa();
  const router = new Router();

  router.get('/', async ctx => {
    ctx.body = 'Hello world!';
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Server started on http://localhost:${port}`);

      resolve(server);
    });
  });
};
