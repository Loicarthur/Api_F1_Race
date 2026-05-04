import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { EcurieType } from '../types/ecurie.type';

export const DriverType = new GraphQLObjectType({
  name: 'Driver',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    trigram: { type: GraphQLString },
    ecurie: { type: EcurieType },
  },
});
