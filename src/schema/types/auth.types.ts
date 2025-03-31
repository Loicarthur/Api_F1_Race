import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

export const AuthResponseType = new GraphQLObjectType({
  name: 'AuthResponse',
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType }
  })
});
