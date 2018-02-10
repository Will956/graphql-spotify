import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import spotifyAuth from './middlewares/spotifyAuth';
import home from './middlewares/home';
import graphQL from './middlewares/graphQL';

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

  router.get('/graphql', graphqlKoa(graphQL()));
  router.post('/graphql', graphqlKoa(graphQL()));

  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

  app.use(bodyParser());
  app.use(cors());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Server started on http://localhost:${port}`);

      resolve(server);
    });
  });
};
