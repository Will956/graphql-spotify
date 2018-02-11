import spotifyAPI from '../../connectors';

export default {
  Query: {
    me: (root, args, context) => spotifyAPI('/me', context),
  },
  Me: {
    name: ({ display_name }) => display_name, // eslint-disable-line
  },
};
