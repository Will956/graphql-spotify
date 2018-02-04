import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';

import spotifyAuth from './middlewares/spotifyAuth';
import home from './middlewares/home';

import { port } from '../config';
import logger from '../logger';

export default async () => {
  const app = new Koa();

  app.use(views(`${__dirname}/views`, {
    map: {
      hbs: 'handlebars',
    },
    extension: 'hbs',
  }));

  const router = new Router();

  router.get('/', home());

  router.get('/callback', spotifyAuth());

  app.use(router.routes());
  app.use(router.allowedMethods());

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Server started on http://localhost:${port}`);

      resolve(server);
    });
  });
};
