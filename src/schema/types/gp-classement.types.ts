import { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';

export const GPClassementType = new GraphQLObjectType({
  name: 'GPClassement',
  fields: {
    id: { type: GraphQLID },
    race: { type: GraphQLString },
    isDNF: { type: GraphQLBoolean },
    position: { type: GraphQLInt },
    time: { type: GraphQLString },
    points: { type: GraphQLInt }
  }
});
