import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
//
import { BetSelectionResultType } from './bet-selection-result.types';

import { GraphQLFieldConfigMap } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    // leagues: { type: new GraphQLList(UserLeagueType) },
    bets: { type: new GraphQLList(BetSelectionResultType) },
  }),
});
