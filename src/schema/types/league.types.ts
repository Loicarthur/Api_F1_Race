import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { ErrorType } from './error.types'; 

export const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: {
    leagueType: { type: GraphQLString },
    leagueName: { type: GraphQLString },
    maxParticipants: { type: GraphQLInt },
    joinCode: { type: GraphQLString },
  },
});

export const LeagueResponseType = new GraphQLObjectType({
  name: 'LeagueResponse',
  fields: () => ({
    league: { type: new GraphQLList(LeagueType) }, 
    error: { type: ErrorType },
  }),
});