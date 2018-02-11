import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import usersResolver from './users';
import usersType from './users/schema.graphql';

export const typeDefs = mergeTypes([usersType]);

export const resolvers = mergeResolvers([usersResolver]);
