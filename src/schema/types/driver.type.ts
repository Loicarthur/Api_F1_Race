import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { EcurieType } from '../types/ecurie.type'; // Assurez-vous que le type Ecurie est défini

export const DriverType = new GraphQLObjectType({
  name: 'Driver',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    picture: { type: GraphQLString },
    trigram: { type: GraphQLString },
    ecurie: { type: EcurieType }, // Référence à l'écurie
  },
});