import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
export const EcurieType = new GraphQLObjectType({
  name: 'Ecurie',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    color: { type: GraphQLString },
    drivers: { type: new GraphQLList(GraphQLString) }, // Liste des IDs des pilotes
  },
});