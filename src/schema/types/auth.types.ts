import { GraphQLObjectType, GraphQLString } from 'graphql';

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
    error: { type: GraphQLString } 
  })
});

// Type d'erreur
export const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: {
    message: { type: GraphQLString },
    code: { type: GraphQLString },
    httpStatus: { type: GraphQLString } 
  }
});
