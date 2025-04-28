import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql';
import { ErrorType } from './error.types'; 
import { UserType } from './auth.types'; 

// Define the LeagueType
export const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: () => ({
    id: { type: GraphQLString },
    isPrivate: { type: GraphQLBoolean },
    leagueName: { type: GraphQLString },
    maxParticipants: { type: GraphQLInt },
    joinCode: { type: GraphQLString },
    users: { type: new GraphQLList(UserType) }, 
  }),
});

// Define the LeagueResponseType
export const LeagueResponseType = new GraphQLObjectType({
  name: 'LeagueResponse',
  fields: () => ({
    league: { type: LeagueType }, 
    error: { type: ErrorType },
    httpStatus: { type: GraphQLInt },
  }),
});