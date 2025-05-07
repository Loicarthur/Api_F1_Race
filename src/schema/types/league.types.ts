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
    createdAt: { type: GraphQLString},
    updatedAt: { type: GraphQLString} 
  }),
});

// Define the LeagueResponseType
export const LeagueResponseType = new GraphQLObjectType({
  name: 'LeagueResponse',
  fields: () => ({
    league: { type: LeagueType }, 
    error: { type: ErrorType },
    httpStatus: { type: GraphQLInt},
  }),
});

export const PublicLeaguesResponseType = new GraphQLObjectType({
  name: 'PublicLeaguesResponse',
  fields: () => ({
    leagues: { type: new GraphQLList(LeagueType) },
    httpStatus: { type: GraphQLInt },
  }),
});

export const LeaguesByUserResponseType = new GraphQLObjectType({
  name: 'LeaguesByUserResponse',
  fields: () => ({
    leagues: { type: new GraphQLList(LeagueType) },
    httpStatus: { type: GraphQLInt },
  }),
});

export const DeleteLeagueResponseType = new GraphQLObjectType({
  name: 'DeleteLeagueResponse',
  fields: () => ({
    success: { type: GraphQLBoolean },
    httpStatus: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

export const GetMembersOfLeagueResponseType = new GraphQLObjectType({
  name: 'GetMembersOfLeagueResponse',
  fields: () => ({
    members: { type: new GraphQLList(UserType) },
    httpStatus: { type: GraphQLInt },
  }),
});

export const LeagueByJoinCodeResponseType = new GraphQLObjectType({
  name: 'LeagueByJoinCodeResponse',
  fields: () => ({
    league: { type: LeagueType },
    error: { type: ErrorType },
    httpStatus: { type: GraphQLInt },
  }),
});