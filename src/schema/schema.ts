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
import {
  DeleteLeagueResponseType,
  GetMembersOfLeagueResponseType,
  LeagueResponseType,
  LeagueType,
  PublicLeaguesResponseType,
  LeagueByJoinCodeResponseType,
} from "./types/league.types";
import { LeagueModel } from '../models/League';

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

const SubmitPredictionInputType = new GraphQLInputObjectType({
  name: "SubmitPredictionInput",
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    predictedPosition: { type: new GraphQLNonNull(GraphQLString) },
    predictedDNF: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const SubmitResultsInputType = new GraphQLInputObjectType({
  name: "SubmitResultsInput",
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    actualDNF: { type: new GraphQLNonNull(GraphQLString) },
    actualPositions: {
      type: new GraphQLNonNull(
        new GraphQLInputObjectType({
          name: "ActualPositionsInput",
          fields: {
            P1: { type: GraphQLString },
            P2: { type: GraphQLString },
            P3: { type: GraphQLString },
            P4: { type: GraphQLString },
            P5: { type: GraphQLString },
            P6: { type: GraphQLString },
            P7: { type: GraphQLString },
            P8: { type: GraphQLString },
            P9: { type: GraphQLString },
            P10: { type: GraphQLString },
            P11: { type: GraphQLString },
            P12: { type: GraphQLString },
            P13: { type: GraphQLString },
            P14: { type: GraphQLString },
            P15: { type: GraphQLString },
            P16: { type: GraphQLString },
            P17: { type: GraphQLString },
            P18: { type: GraphQLString },
            P19: { type: GraphQLString },
            P20: { type: GraphQLString },
          },
        })
      ),
    },
  }),
});

const LeaveLeagueInputType = new GraphQLInputObjectType({
  name: 'LeaveLeagueInput',
  fields: {
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const PlayerRankingType = new GraphQLObjectType({
  name: "PlayerRanking",
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    totalPoints: { type: GraphQLInt },
    positionPoints: { type: GraphQLInt },
    bonusPoints: { type: GraphQLInt },
  },
});

const LeagueRankingResponseType = new GraphQLObjectType({
  name: "LeagueRankingResponse",
  fields: {
    ranking: { type: new GraphQLList(PlayerRankingType) },
    httpStatus: { type: GraphQLInt },
  },
});

const MutationResponseType = new GraphQLObjectType({
  name: "MutationResponse",
  fields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  },
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
    publicLeagues: {
      type: PublicLeaguesResponseType,
      resolve: leagueResolvers.Query.publicLeagues,
    },
    leaguesByUserId: {
      type: new GraphQLList(LeagueType),
      args: {
        input: { type: new GraphQLNonNull(GetLeaguesByUserIdInputType) },
      },
      resolve: async (_, { input }, context) => {
        const leagues = await leagueResolvers.Query.leaguesByUserId(
          _,
          input,
          context,
          context.info
        );
        return leagues; 
      },
    },
    leagueByJoinCode: {
      type: LeagueByJoinCodeResponseType, // Utilise le type personnalisé
      args: {
        input: { type: new GraphQLNonNull(GetLeagueByJoinCodeInputType) },
      },
      resolve: async (_, { input }, context) => {
        return leagueResolvers.Query.leagueByJoinCode(_, { input }, context, context.info);
      },
    },
    getMembersOfLeague: {
      type: GetMembersOfLeagueResponseType, 
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) }, 
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext
      ) => {
        const { leagueId } = args as { leagueId: string };
        return leagueResolvers.Query.getMembersOfLeague(
          _,
          { leagueId },
          context,
          context.info
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
    calculateLeagueRanking: {
      type: LeagueRankingResponseType, // Type de réponse
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) }, // Argument requis
      },
      resolve: async (_, { leagueId }) => {
        const league = await LeagueModel.findById(leagueId);
        if (!league) {
          throw new Error("League not found");
        }
        return {
          httpStatus: 200,
        };
      },
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
      resolve: async (_, { input: { leagueId } }, context) => {
        return leagueResolvers.Mutation.deleteLeague(
          _,
          { leagueId },
          context,
          context.info
        );
      },
    },
    modifyLeague: {
      type: LeagueResponseType,
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(ModifyLeagueInputType) },
      },
      resolve: async (_, args, context) => {
        const { leagueId, input } = args;
        return leagueResolvers.Mutation.modifyLeague(
          _,
          { leagueId, input },
          context,
          context.info
        );
      },
    },
    addUserToLeague: {
      type: LeagueResponseType,
      args: {
        input: { type: new GraphQLNonNull(AddUserToLeagueInputType) },
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext
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
          context.info
        );
      },
    },
    leaveLeague: {
      type: MutationResponseType,
      args: {
        input: { type: new GraphQLNonNull(LeaveLeagueInputType) },
      },
      resolve: async (
        _: unknown,
        args: { [argName: string]: any }, // Adjusted to match GraphQLFieldResolver signature
        context: MyContext
      ) => {
        const { leagueId, userId } = args.input as { leagueId: string; userId: string }; // Explicit casting
        return await leagueResolvers.Mutation.leaveLeague(_, { input: { leagueId, userId } }, context, context.info);
      },
    },

    submitPrediction: {
      type: MutationResponseType,
      args: {
        input: { type: new GraphQLNonNull(SubmitPredictionInputType) },
      },
      resolve: async (
        _: unknown,
        args: { [argName: string]: any },
        context: MyContext
      ) => {
        const { leagueId, userId, predictedPosition, predictedDNF } = args.input as {
          leagueId: string;
          userId: string;
          predictedPosition: string;
          predictedDNF: string;
        };
        return await leagueResolvers.Mutation.submitPrediction(_, { input: { leagueId, userId, predictedPosition, predictedDNF } }, context, context.info);
      },
    },

    submitResults: {
      type: MutationResponseType, // Type de réponse
      args: {
        input: { type: new GraphQLNonNull(SubmitResultsInputType) }, // Type d'entrée
      },
      resolve: async (
        _: unknown,
        args: { [argName: string]: any },
        context: MyContext
      ) => {
        const { leagueId, actualDNF, actualPositions } = args.input as {
          leagueId: string;
          actualDNF: string;
          actualPositions: { [position: string]: string };
        };
        return await leagueResolvers.Mutation.submitResults(
          _,
          { input: { leagueId, actualDNF, actualPositions } },
          context,
          context.info
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


