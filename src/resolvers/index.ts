import { IResolvers, AuthenticationError } from 'apollo-server-express';

export const resolvers: IResolvers<any, any> = {
  Query: {
    me: async (_source, _args, { dataSources, token }) => {
      if (!token) throw new AuthenticationError('You must be logged in.');

      return dataSources.SpotifyAPI.getMe();
    },
    login: () => ({
      // Very long url that you don't want to read. Really.
      url: `https://accounts.spotify.com/authorize?client_id=${process.env.clientId}&response_type=code&redirect_uri=http://localhost:4000/callback&scope=user-read-private,user-read-birthdate,user-read-email,playlist-read-private,user-library-modify,playlist-read-collaborative,playlist-modify-private,user-follow-modify,user-read-currently-playing,user-read-currently-playing,user-library-read,user-top-read,playlist-modify-public,user-follow-read,user-read-playback-state,user-modify-playback-state`,
    }),
  },
};
