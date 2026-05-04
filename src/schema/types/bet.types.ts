import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export const BetType = new GraphQLObjectType({
  name: 'Bet',
  fields: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    gpId: { type: GraphQLString },
    driverId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    points: { type: GraphQLInt },
  },
});
