import { ApolloServer } from "apollo-server";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

import SpotifyAPI from './datasources/spotify';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({ SpotifyAPI: new SpotifyAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
