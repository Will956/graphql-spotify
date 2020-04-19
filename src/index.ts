import express from 'express';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './schemas';
import { resolvers } from './resolvers';

import SpotifyAPI from './datasources/spotify';

dotenv.config();

const app = express();

app.use(cookieParser());

app.use('/callback', async (req, res) => {
  const { code } = req.query;
  if (code) {
    const { access_token, refresh_token } = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.clientId}:${process.env.clientSecret}`
          ).toString('base64')}`,
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:4000/callback`,
      }
    ).then((res) => res.json());

    res.cookie('access_token', access_token);
    res.cookie('refresh_token', refresh_token);
  }
  res.redirect('/graphql');
});

const server = new ApolloServer({
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  typeDefs,
  resolvers,
  dataSources: () => ({ SpotifyAPI: new SpotifyAPI() }),
  context: ({ req: { cookies } }) => ({ token: cookies.access_token }),
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
