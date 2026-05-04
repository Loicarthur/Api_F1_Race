import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import { register, login, getAllUsers } from '../resolvers/auth.resolver';
import { AuthResponseType, UserType } from './types/auth.types';
import { MyContext } from '../types/MyContext';
import { leagueResolvers } from '../resolvers/league.resolver';
import {
  DeleteLeagueResponseType,
  GetMembersOfLeagueResponseType,
  LeagueResponseType,
  LeagueType,
  PublicLeaguesResponseType,
  LeagueByJoinCodeResponseType,
} from './types/league.types';
import { getEcuries, getEcurieById } from '../resolvers/ecurie.resolver';
import { assignPointsToBet, createBet, getBetById, updateBet } from '../resolvers/bet.resolver';
import fetchAndUpdateDriversAndEcuries from '../services/driver.service';
import fetchAndSaveLatestGP from '../services/gp.service';
import { driverResolvers } from '../resolvers/driver.resolver';
import { EcurieType } from './types/ecurie.type';
import { gpResolvers } from '../resolvers/gp.resolver';
import { GpType } from './types/gp.type';
import {
  RegisterInputType,
  LoginInputType,
  LeagueInputType,
  ModifyLeagueInputType,
  AddUserToLeagueInputType,
  GetLeaguesByUserIdInputType,
  GetLeagueByJoinCodeInputType,
  DeleteLeagueInputType,
  CreateBetInputType,
  UpdateBetInputType,
} from './inputs';
import { logger } from '../utils/logger';
import { requireAdmin } from '../middleware/auth';
import { BetType } from './types/bet.types';
import { DriverType } from './types/driver.type';

const SyncResponseType = new GraphQLObjectType({
  name: 'SyncResponse',
  fields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve: getAllUsers,
    },
    leagues: {
      type: new GraphQLList(LeagueType),
      resolve: leagueResolvers.Query.leagues,
    },
    publicLeagues: {
      type: PublicLeaguesResponseType,
      resolve: leagueResolvers.Query.publicLeagues,
    },
    leaguesByUserId: {
      type: new GraphQLList(LeagueType),
      args: { input: { type: new GraphQLNonNull(GetLeaguesByUserIdInputType) } },
      resolve: async (_, { input }, context, info) =>
        leagueResolvers.Query.leaguesByUserId(_, input, context, info),
    },
    leagueByJoinCode: {
      type: LeagueByJoinCodeResponseType,
      args: { input: { type: new GraphQLNonNull(GetLeagueByJoinCodeInputType) } },
      resolve: async (_, { input }, context, info) =>
        leagueResolvers.Query.leagueByJoinCode(_, { input }, context, info),
    },
    getMembersOfLeague: {
      type: GetMembersOfLeagueResponseType,
      args: { leagueId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_: unknown, args: any, context: MyContext, info: any) =>
        leagueResolvers.Query.getMembersOfLeague(_, { leagueId: args.leagueId }, context, info),
    },
    getEcuries: {
      type: new GraphQLList(EcurieType),
      resolve: getEcuries,
    },
    getEcurieById: {
      type: EcurieType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_: unknown, args: any) => getEcurieById(_, { id: args.id }),
    },
    gps: {
      type: new GraphQLList(GpType),
      resolve: gpResolvers.Query.gps,
    },
    lastGp: {
      type: GpType,
      resolve: gpResolvers.Query.lastGp,
    },
    getBetById: {
      type: BetType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (_: unknown, args: any, context: MyContext) =>
        getBetById(_, { id: args.id }, context),
    },
    drivers: {
      type: new GraphQLList(DriverType),
      resolve: driverResolvers.Query.drivers,
    },
  }),
});

const RootMutation = new GraphQLObjectType<unknown, MyContext>({
  name: 'RootMutationType',
  fields: () => ({
    register: {
      type: AuthResponseType,
      args: { input: { type: new GraphQLNonNull(RegisterInputType) } },
      resolve: register,
    },
    login: {
      type: AuthResponseType,
      args: { input: { type: new GraphQLNonNull(LoginInputType) } },
      resolve: login,
    },
    createLeague: {
      type: LeagueResponseType,
      args: { input: { type: new GraphQLNonNull(LeagueInputType) } },
      resolve: leagueResolvers.Mutation.createLeague,
    },
    deleteLeague: {
      type: DeleteLeagueResponseType,
      args: { input: { type: new GraphQLNonNull(DeleteLeagueInputType) } },
      resolve: async (_, { input: { leagueId } }, context, info) =>
        leagueResolvers.Mutation.deleteLeague(_, { leagueId }, context, info),
    },
    modifyLeague: {
      type: LeagueResponseType,
      args: {
        leagueId: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(ModifyLeagueInputType) },
      },
      resolve: async (_, { leagueId, input }, context, info) =>
        leagueResolvers.Mutation.modifyLeague(_, { leagueId, input }, context, info),
    },
    addUserToLeague: {
      type: LeagueResponseType,
      args: { input: { type: new GraphQLNonNull(AddUserToLeagueInputType) } },
      resolve: async (_: unknown, args: any, context: MyContext, info: any) =>
        leagueResolvers.Mutation.addUserToLeague(null, { input: args.input }, context, info),
    },
    createBet: {
      type: BetType,
      args: { input: { type: new GraphQLNonNull(CreateBetInputType) } },
      resolve: createBet,
    },
    updateBet: {
      type: BetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        input: { type: new GraphQLNonNull(UpdateBetInputType) },
      },
      resolve: async (_: unknown, args: any, context: MyContext) =>
        updateBet(_, { id: args.id, input: args.input }, context),
    },
    assignPointsToBet: {
      type: BetType,
      args: {
        betId: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_: unknown, args: any, context: MyContext) =>
        assignPointsToBet(_, { betId: args.betId, position: args.position }, context),
    },
    syncLatestGP: {
      type: SyncResponseType,
      resolve: async (_: unknown, __: unknown, context: MyContext) => {
        requireAdmin(context);
        try {
          await fetchAndSaveLatestGP();
          return { success: true, message: 'GP data synchronized successfully.' };
        } catch (error) {
          logger.error('Error synchronizing GP data', { error });
          return { success: false, message: 'Failed to synchronize GP data.' };
        }
      },
    },
    syncDriversAndEcuries: {
      type: SyncResponseType,
      resolve: async (_: unknown, __: unknown, context: MyContext) => {
        requireAdmin(context);
        try {
          await fetchAndUpdateDriversAndEcuries();
          return { success: true, message: 'Drivers and Ecuries synchronized successfully.' };
        } catch (error) {
          logger.error('Error synchronizing drivers and ecuries', { error });
          return { success: false, message: 'Failed to synchronize drivers and ecuries.' };
        }
      },
    },
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
