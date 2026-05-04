import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: {
    message: { type: GraphQLString },
    code: { type: GraphQLString },
    httpStatus: { type: GraphQLInt },
  },
});
