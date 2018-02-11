import spotifyAPI from '../../connectors';

export default {
  Query: {
    me: (root, args, context) => spotifyAPI('/me', context),
    userById: (root, { id }, context) => spotifyAPI(`/users/${id}`, context),
  },
  User: {
    name: ({ display_name }) => display_name, // eslint-disable-line
    externalUrl: ({ external_urls }) => external_urls.spotify, // eslint-disable-line
  },
};
