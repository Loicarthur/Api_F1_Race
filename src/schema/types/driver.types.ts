import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
// import { EcurieType } from './ecurie.types';

export const DriverType = new GraphQLObjectType({
  name: 'Driver',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    trigram: { type: GraphQLString },
    // ecurie: { type: EcurieType },
  })
});
