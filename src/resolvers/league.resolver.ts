import { GraphQLFieldResolver } from 'graphql';
import { League, LeagueModel } from '../models/League';
import { MyContext } from '../types/MyContext';
import { UserModel } from '../models/User';
import { BetModel } from '../models/Bet';
import { requireAuth } from '../middleware/auth';
import { logger } from '../utils/logger';

function generateJoinCode(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const createLeague: GraphQLFieldResolver<unknown, MyContext> = async (_, args, context) => {
  requireAuth(context);
  try {
    const { isPrivate, leagueName, maxParticipants } = args.input;
    const existingLeague = await LeagueModel.findOne({ leagueName });
    if (existingLeague) {
      return {
        league: null,
        error: {
          message: 'League already exists',
          code: 'LEAGUE_ALREADY_EXISTS',
          httpStatus: '400',
        },
      };
    }

    let joinCode;
    let exists = true;
    while (exists) {
      joinCode = generateJoinCode(8);
      const leagueWithJoinCode = await LeagueModel.findOne({ joinCode });
      exists = !!leagueWithJoinCode;
    }

    const league = new LeagueModel({ isPrivate, leagueName, maxParticipants, joinCode, users: [] });
    await league.save();
    return {
      league: league,
      error: null,
      httpStatus: '201',
    };
  } catch (error) {
    return {
      league: null,
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: '500',
      },
    };
  }
};

export const getAllLeagues: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    return await LeagueModel.find({});
  } catch (error) {
    logger.error('Error fetching leagues', { error });
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const getAllPublicLeagues: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const leagues = await LeagueModel.find({ isPrivate: false });
    return {
      leagues,
      httpStatus: 200,
    };
  } catch {
    return {
      leagues: null,
      httpStatus: 500,
    };
  }
};

export const getLeaguesByUserId: GraphQLFieldResolver<
  unknown,
  MyContext,
  { userId: string }
> = async (_, { userId }) => {
  try {
    return await LeagueModel.find({ 'users.user': userId });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const deleteLeague: GraphQLFieldResolver<unknown, MyContext, { leagueId: string }> = async (
  _,
  { leagueId },
  context
) => {
  requireAuth(context);
  try {
    const league = await LeagueModel.findByIdAndDelete(leagueId);
    if (!league) {
      return {
        success: false,
        httpStatus: 404,
        message: 'League not found',
      };
    }
    return {
      success: true,
      httpStatus: 204,
      message: 'League successfully deleted',
    };
  } catch (error) {
    return {
      success: false,
      httpStatus: 500,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

export const modifyLeague: GraphQLFieldResolver<
  unknown,
  MyContext,
  { leagueId: string; input: Partial<League> }
> = async (_, { leagueId, input }, context) => {
  requireAuth(context);
  try {
    const league = await LeagueModel.findByIdAndUpdate(leagueId, input, { new: true });
    if (!league) {
      throw new Error('League not found');
    }
    return {
      league,
      httpStatus: 200,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const getLeagueByJoinCode: GraphQLFieldResolver<
  unknown,
  MyContext,
  { input: { joinCode: string } }
> = async (_, { input }) => {
  try {
    if (!input || !input.joinCode) {
      return {
        league: null,
        error: {
          message: 'Invalid input: joinCode is required',
          code: 'INVALID_INPUT',
          httpStatus: 400,
        },
      };
    }
    const { joinCode } = input;
    const league = await LeagueModel.findOne({ joinCode });
    if (!league) {
      return {
        league: null,
        error: {
          message: 'League not found',
          code: 'LEAGUE_NOT_FOUND',
          httpStatus: 404,
        },
      };
    }
    return {
      league,
      error: null,
      httpStatus: 200,
    };
  } catch (error) {
    return {
      league: null,
      error: {
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: 500,
      },
    };
  }
};

export const addUserToLeague: GraphQLFieldResolver<
  unknown,
  MyContext,
  { input: { leagueId: string; userId: string; admin?: boolean } }
> = async (_, { input }, context) => {
  requireAuth(context);
  const { leagueId, userId, admin = false } = input;
  try {
    const league = await LeagueModel.findById(leagueId);
    if (!league) {
      throw new Error('League not found');
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (league.users.some((u) => u.user.toString() === userId)) {
      throw new Error('User is already in the league');
    }

    league.users.push({ id: userId, league, user, admin });
    await league.save();

    const updatedLeague = await LeagueModel.findById(leagueId).populate({
      path: 'users.user',
      select: 'username email',
    });

    return {
      league: updatedLeague,
      httpStatus: 200,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const getMembersOfLeague: GraphQLFieldResolver<
  unknown,
  MyContext,
  { leagueId: string }
> = async (_, { leagueId }) => {
  try {
    const league = await LeagueModel.findById(leagueId).populate('users.user');
    if (!league) {
      throw new Error('League not found');
    }
    return {
      members: league.users,
      httpStatus: 200,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const leaveLeague: GraphQLFieldResolver<
  unknown,
  MyContext,
  { input: { leagueId: string; userId: string } }
> = async (_, { input }, context) => {
  requireAuth(context);
  const { leagueId, userId } = input;
  try {
    const league = await LeagueModel.findById(leagueId);
    if (!league) {
      throw new Error('League not found');
    }

    league.users = league.users.filter((user) => user.id !== userId);
    await league.save();

    return {
      success: true,
      message: 'User successfully removed from the league',
      httpStatus: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      httpStatus: 500,
    };
  }
};

export const calculateLeagueRanking = async (_: unknown, { leagueId }: { leagueId: string }) => {
  try {
    const bets = await BetModel.find({ leagueId }).populate('userId');

    const ranking = bets.reduce((acc: any, bet: any) => {
      const userId = bet.userId._id.toString();
      if (!acc[userId]) {
        acc[userId] = {
          userId: bet.userId._id,
          username: bet.userId.username,
          totalPoints: 0,
        };
      }
      acc[userId].totalPoints += bet.points;
      return acc;
    }, {});

    return Object.values(ranking).sort((a: any, b: any) => b.totalPoints - a.totalPoints);
  } catch (error) {
    logger.error('Error in calculateLeagueRanking', { error });
    throw new Error('Failed to calculate league ranking');
  }
};

export const leagueResolvers = {
  Query: {
    leagues: getAllLeagues,
    publicLeagues: getAllPublicLeagues,
    leaguesByUserId: getLeaguesByUserId,
    leagueByJoinCode: getLeagueByJoinCode,
    getMembersOfLeague: getMembersOfLeague,
  },
  Mutation: {
    createLeague,
    deleteLeague,
    modifyLeague,
    addUserToLeague,
    leaveLeague,
  },
};
