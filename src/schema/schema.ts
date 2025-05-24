import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from "graphql";
import { register, login, getAllUsers } from "../resolvers/auth.resolver";
import { F1Resolver } from "../resolvers/f1.resolver";
import { F1HistoryResolver } from "../resolvers/f1-history.resolver";
import { CarDataType, LapTimeType, TrackStatusType } from "./types/f1.types";
import { RaceHistoryType } from "./types/race-history";
import { AuthResponseType, UserType } from "./types/auth.types";
import { MyContext } from "../types/MyContext";
import { leagueResolvers } from "../resolvers/league.resolver";
import { gpClassementResolvers } from '../resolvers/gp-classement.resolver';
import { f1ResultsResolvers } from '../resolvers/f1-results.resolver';
import { F1GrandPrixType, DriverStatsType, StandingEntryType } from './types/f1-results.types';

import { GPClassementType } from "./types/gp-classement.types";

import {
  DeleteLeagueResponseType,
  GetMembersOfLeagueResponseType,
  LeagueResponseType,
  LeagueType,
  PublicLeaguesResponseType,
  LeagueByJoinCodeResponseType,
} from "./types/league.types";

const f1Resolver = new F1Resolver();
const f1HistoryResolver = new F1HistoryResolver();

// Input types
const RegisterInputType = new GraphQLInputObjectType({
  name: "RegisterInput",
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LoginInputType = new GraphQLInputObjectType({
  name: "LoginInput",
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LeagueInputType = new GraphQLInputObjectType({
  name: "LeagueInput",
  fields: () => ({
    isPrivate: { type: new GraphQLNonNull(GraphQLBoolean) },
    leagueName: { type: new GraphQLNonNull(GraphQLString) },
    maxParticipants: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

// Input types for league operations
const ModifyLeagueInputType = new GraphQLInputObjectType({
  name: "ModifyLeagueInput",
  fields: () => ({
    isPrivate: { type: GraphQLBoolean },
    leagueName: { type: GraphQLString },
    maxParticipants: { type: GraphQLInt },
  }),
});

const AddUserToLeagueInputType = new GraphQLInputObjectType({
  name: "AddUserToLeagueInput",
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    admin: { type: GraphQLBoolean },
  }),
});

const GetLeaguesByUserIdInputType = new GraphQLInputObjectType({
  name: "GetLeaguesByUserIdInput",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const GetLeagueByJoinCodeInputType = new GraphQLInputObjectType({
  name: "GetLeagueByJoinCodeInput",
  fields: () => ({
    joinCode: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const DeleteLeagueInputType = new GraphQLInputObjectType({
  name: "DeleteLeagueInput",
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: getAllUsers,
    },
    getPastRaces: {
      type: new GraphQLList(RaceHistoryType),
      args: {
        season: { type: GraphQLInt },
      },
      resolve: f1HistoryResolver.getPastRaceResults,
    },
    getRaceDetails: {
      type: RaceHistoryType,
      args: {
        raceId: { type: GraphQLInt },
      },
      resolve: f1HistoryResolver.getRaceDetails,
    },
    getAllLeagues: {
      type: new GraphQLList(LeagueType),
      resolve: leagueResolvers.Query.leagues,
    },
    leagues: {
      type: new GraphQLList(LeagueType),
      resolve: leagueResolvers.Query.leagues,
    },
    gpClassement: {
      type: new GraphQLList(GPClassementType),
      args: {
        gpId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: gpClassementResolvers.Query.gpClassement,
    },
    userClassements: {
      type: new GraphQLList(GPClassementType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: gpClassementResolvers.Query.userClassements,
    },
    
    
    publicLeagues: {
      type: PublicLeaguesResponseType,
      resolve: leagueResolvers.Query.publicLeagues,
    },
    leaguesByUserId: {
      type: new GraphQLList(LeagueType),
      args: {
        input: { type: new GraphQLNonNull(GetLeaguesByUserIdInputType) },
      },
      resolve: async (_, { input }, context, info) => {
        const leagues = await leagueResolvers.Query.leaguesByUserId(
          _,
          input,
          context,
          info
        );
        return leagues;
      },
    },
    leagueByJoinCode: {
      type: LeagueByJoinCodeResponseType, // Utilise le type personnalisé
      args: {
        input: { type: new GraphQLNonNull(GetLeagueByJoinCodeInputType) },
      },
      resolve: async (_, { input }, context, info) => {
        return leagueResolvers.Query.leagueByJoinCode(_, { input }, context, info);
      },
    },
    getMembersOfLeague: {
      type: GetMembersOfLeagueResponseType, // Utilise le type personnalisé
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) }, // Utilise le type personnalisé
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext,
        info
      ) => {
        const { leagueId } = args as { leagueId: string };
        return leagueResolvers.Query.getMembersOfLeague(
          _,
          { leagueId },
          context,
          info
        );
      },
    },
    carData: {
      type: new GraphQLList(CarDataType),
      args: {
        session_key: { type: GraphQLInt },
        driver_number: { type: GraphQLInt },
      },
      resolve: f1Resolver.getCarData,
    },
    lapTimes: {
      type: new GraphQLList(LapTimeType),
      args: {
        session_key: { type: GraphQLInt },
        driver_number: { type: GraphQLInt },
      },
      resolve: f1Resolver.getLapTimes,
    },
    trackStatus: {
      type: TrackStatusType,
      args: {
        session_key: { type: GraphQLInt },
      },
      resolve: f1Resolver.getTrackStatus,
    },
    sessions: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Session",
          fields: {
            session_key: { type: GraphQLInt },
            meeting_key: { type: GraphQLInt },
            session_name: { type: GraphQLString },
            session_type: { type: GraphQLString },
            session_date: { type: GraphQLString },
          },
        })
      ),
      args: {
        year: { type: GraphQLInt },
        round: { type: GraphQLInt },
        session_type: { type: GraphQLString },
      },
      resolve: f1Resolver.getSessions,
    },
    sessionDetails: {
      type: new GraphQLObjectType({
        name: "SessionDetails",
        fields: {
          drivers: {
            type: new GraphQLList(
              new GraphQLObjectType({
                name: "Driver",
                fields: {
                  driver_number: { type: GraphQLInt },
                  name: { type: GraphQLString },
                  team: { type: GraphQLString },
                },
              })
            ),
          },
          lapTimes: { type: new GraphQLList(LapTimeType) },
          trackStatus: { type: TrackStatusType },
          carData: { type: new GraphQLList(CarDataType) },
        },
      }),
      args: {
        session_key: { type: GraphQLInt },
      },
      resolve: f1Resolver.getSessionDetails,
    },
    f1Results: {
      type: new GraphQLList(F1GrandPrixType),
      resolve: f1ResultsResolvers.Query.f1Results
    },
    f1GpResults: {
      type: F1GrandPrixType,
      args: {
        gpId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: f1ResultsResolvers.Query.f1GpResults
    },
    f1SeasonResults: {
      type: new GraphQLList(F1GrandPrixType),
      args: {
        season: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: f1ResultsResolvers.Query.f1SeasonResults
    },
    f1LatestResult: {
      type: F1GrandPrixType,
      resolve: f1ResultsResolvers.Query.f1LatestResult
    },
    f1Calendar: {
      type: new GraphQLList(F1GrandPrixType),
      args: {
        season: { type: GraphQLInt }
      },
      resolve: f1ResultsResolvers.Query.f1Calendar
    },
    f1DriverStats: {
      type: DriverStatsType,
      args: {
        driverId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: f1ResultsResolvers.Query.f1DriverStats
    },
    f1DriverStandings: {
      type: new GraphQLList(StandingEntryType),
      args: {
        season: { type: GraphQLInt }
      },
      resolve: f1ResultsResolvers.Query.f1DriverStandings
    },
    f1ConstructorStandings: {
      type: new GraphQLList(StandingEntryType),
      args: {
        season: { type: GraphQLInt }
      },
      resolve: f1ResultsResolvers.Query.f1ConstructorStandings
    },
  }),
});

// Root Mutation
const RootMutation = new GraphQLObjectType<unknown, MyContext>({
  name: "RootMutation",
  fields: () => ({
    register: {
      type: AuthResponseType,
      args: {
        input: { type: new GraphQLNonNull(RegisterInputType) },
      },
      resolve: register,
    },
    login: {
      type: AuthResponseType,
      args: {
        input: { type: new GraphQLNonNull(LoginInputType) },
      },
      resolve: login,
    },
    createLeague: {
      type: LeagueResponseType,
      args: {
        input: { type: new GraphQLNonNull(LeagueInputType) },
      },
      resolve: leagueResolvers.Mutation.createLeague,
    },
    deleteLeague: {
      type: DeleteLeagueResponseType, // Utilise le type personnalisé
      args: {
        input: { type: new GraphQLNonNull(DeleteLeagueInputType) },
      },
      resolve: async (_, { input: { leagueId } }, context, info) => {
        return leagueResolvers.Mutation.deleteLeague(
          _,
          { leagueId },
          context,
          info
        );
      },
    },
    modifyLeague: {
      type: LeagueResponseType,
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(ModifyLeagueInputType) },
      },
      resolve: async (_, args, context, info) => {
        const { leagueId, input } = args;
        return leagueResolvers.Mutation.modifyLeague(
          _,
          { leagueId, input },
          context,
          info
        );
      },
    },
    // GP Classement mutations
    createGpClassement: {
      type: GPClassementType,
      args: {
        gpId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: gpClassementResolvers.Mutation.createGPClassement,
    },
    updateGpClassementResult: {
      type: GPClassementType,
      args: {
        gpId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: gpClassementResolvers.Mutation.updateGPClassementResult,
    },

    // Tracks Bet mutations
    
    

    addUserToLeague: {
      type: LeagueResponseType,
      args: {
        input: { type: new GraphQLNonNull(AddUserToLeagueInputType) },
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext,
        info
      ) => {
        const { leagueId, userId, admin } = args.input as {
          leagueId: string;
          userId: string;
          admin?: boolean;
        };
        return leagueResolvers.Mutation.addUserToLeague(
          null,
          { input: { leagueId, userId, admin } },
          context,
          info
        );
      },
    },
  }),
});

// Export the schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
