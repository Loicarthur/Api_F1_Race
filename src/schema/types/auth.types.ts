import { GraphQLObjectType, GraphQLString } from 'graphql';
import { ErrorType } from '../types/ErrorType';
// Type d'utilisateur
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

// Type de réponse d'authentification
export const AuthResponseType = new GraphQLObjectType({
  name: 'AuthResponse',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
    error: { type: ErrorType },
  })
});
