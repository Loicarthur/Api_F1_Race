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

import { CarDataType, LapTimeType, TrackStatusType } from "./types/f1.types";

import { AuthResponseType, UserType } from "./types/auth.types";
import { MyContext } from "../types/MyContext";
import { leagueResolvers } from "../resolvers/league.resolver";
import { gpClassementResolvers } from '../resolvers/gp-classement.resolver';



import { GPClassementType } from "./types/gp-classement.types";

import {
  DeleteLeagueResponseType,
  GetMembersOfLeagueResponseType,
  LeagueResponseType,
  LeagueType,
  PublicLeaguesResponseType,
  LeagueByJoinCodeResponseType,
} from "./types/league.types";
import { getEcuries, getEcurieById } from '../resolvers/ecurie.resolver';
import { assignPointsToBet, createBet, getBetById, updateBet} from "../resolvers/bet.resolver";
import { driverResolvers } from "../resolvers/driver.resolver";

const f1Resolver = new F1Resolver();


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

export const CreateEcurieInputType = new GraphQLInputObjectType({
  name: 'CreateEcurieInput',
  fields: {
    name: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    color: { type: GraphQLString },
    drivers: { type: new GraphQLList(GraphQLString) }, // Liste des IDs des pilotes
  },
});


const BetType = new GraphQLObjectType({
  name: "Bet",
  fields: {
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    gpId: { type: GraphQLString },
    driverId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    points: { type: GraphQLInt },
  },
});

const UpdateBetInputType = new GraphQLInputObjectType({
  name: "UpdateBetInput",
  fields: {
    gpId: { type: GraphQLString },
    driverId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    points: { type: GraphQLInt },
  },
});

const CreateBetInputType = new GraphQLInputObjectType({
  name: "CreateBetInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    gpId: { type: new GraphQLNonNull(GraphQLString) },
    driverId: { type: new GraphQLNonNull(GraphQLString) },
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    points: { type: GraphQLInt }, // Optionnel, par défaut à 0
  },
});

const SyncDriversResponseType = new GraphQLObjectType({
  name: 'SyncDriversResponse',
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
      type: LeagueByJoinCodeResponseType, 
      args: {
        input: { type: new GraphQLNonNull(GetLeagueByJoinCodeInputType) },
      },
      resolve: async (_, { input }, context, info) => {
        return leagueResolvers.Query.leagueByJoinCode(_, { input }, context, info);
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
    
    getEcuries: {
      type: new GraphQLList(EcurieType),
      resolve: getEcuries,
    },
    getEcurieById: {
      type: EcurieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_: unknown, args: { [key: string]: any }) => {
        const { id } = args as { id: string };
        return getEcurieById(_, { id });
      },
    },
    getBetById: {
      type: BetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext
      ) => {
        const { id } = args as { id: string };
        return getBetById(_, { id }, context);
      },
    },
  }),
});


// Root Mutation
const RootMutation = new GraphQLObjectType<unknown, MyContext>({
  name: "RootMutationType",
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
      type: DeleteLeagueResponseType,
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
        gpId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: gpClassementResolvers.Mutation.createGPClassement,
    },
    updateGpClassementResult: {
      type: GPClassementType,
      args: {
        gpId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: gpClassementResolvers.Mutation.updateGPClassementResult,
    },
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
    createBet: {
      type: BetType,
      args: {
        input: { type: new GraphQLNonNull(CreateBetInputType) },
      },
      resolve: createBet,
    },
    updateBet: {
      type: BetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(UpdateBetInputType) },
      },
      resolve: async (
        _: unknown,
        args: { [argName: string]: any },
        context: MyContext
      ) => {
        const { id, input } = args as { id: string; input: { driverId?: string; points?: number } };
        return updateBet(_, { id, input }, context);
      },
    },
    assignPointsToBet: {
      type: BetType,
      args: {
        betId: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (
        _: unknown,
        args: { [key: string]: any },
        context: MyContext
      ) => {
        const { betId, position } = args as { betId: string; position: string };
        return assignPointsToBet(_, { betId, position }, context);
      },
    },
    syncDrivers: {
      type: SyncDriversResponseType,
      resolve: driverResolvers.Mutation.syncDrivers, // Appelle la mutation syncDrivers
    },
  }),
});

// Export the schema
export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});


