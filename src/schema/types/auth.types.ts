import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { ErrorType } from './error.types';
// Type d'utilisateur
export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Type de réponse d'authentification
export const AuthResponseType = new GraphQLObjectType({
  name: 'AuthResponse',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
    error: { type: ErrorType },
    httpStatus: { type: GraphQLInt },
  }),
});
