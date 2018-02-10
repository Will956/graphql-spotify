import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../schemas/schema.graphql';
import resolvers from '../resolvers';

export default () => async ctx => ({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  context: {
    cookies: ctx.cookies,
    accessToken: ctx.cookies.get('access_token'),
    refreshToken: ctx.cookies.get('refresh_token'),
  },
});
