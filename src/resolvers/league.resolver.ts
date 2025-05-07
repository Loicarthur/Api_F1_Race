import { GraphQLFieldResolver } from 'graphql';
import { League, LeagueModel } from '../models/League'; 
import { MyContext } from '../types/MyContext';
import { UserModel } from '../models/User';

// Fonction utilitaire pour générer un code de participation
function generateJoinCode(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Resolver pour créer une ligue
export const createLeague: GraphQLFieldResolver<unknown, MyContext> = async (_, args) => {
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

    // Génération d'un code de participation unique
    let joinCode;
    let exists = true;
    while (exists) {
      joinCode = generateJoinCode(8);
      const leagueWithJoinCode = await LeagueModel.findOne({ joinCode });
      exists = !!leagueWithJoinCode;
    }

    // Créez la nouvelle ligue
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
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: '500',
      },
    };
  }
};

// Obtient toutes les ligues
export const getAllLeagues: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const leagues = await LeagueModel.find({});
    return leagues; 
  } catch (error) {
    console.error("Erreur lors de la récupération des ligues :", error);
    throw new Error(error instanceof Error ? error.message : 'Une erreur inattendue est survenue');
  }
};

// Resolver to get all public leagues
export const getAllPublicLeagues: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const leagues = await LeagueModel.find({ isPrivate: false });
    return {
      leagues,
      httpStatus: 200,
    };
  } catch (error) {
    return {
      leagues: null,
      httpStatus: 500,
    };
  }
};

// Resolver to get leagues by user ID
export const getLeaguesByUserId: GraphQLFieldResolver<unknown, MyContext, { userId: string }> = async (_, { userId }) => {
  try {
    const leagues = await LeagueModel.find({ 'users.user': userId });
    return leagues; 
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

// Resolver to delete a league
export const deleteLeague: GraphQLFieldResolver<unknown, MyContext, { leagueId: string }> = async (_, { leagueId }) => {
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

// Resolver to modify a league
export const modifyLeague: GraphQLFieldResolver<unknown, MyContext, { leagueId: string; input: Partial<League> }> = async (_, { leagueId, input }) => {
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

// Resolver to get league by join code
export const getLeagueByJoinCode: GraphQLFieldResolver<unknown, MyContext, { input: { joinCode: string } }> = async (_, { input }) => {
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

// Resolver to add a user to a league
export const addUserToLeague: GraphQLFieldResolver<unknown, MyContext, { input: { leagueId: string; userId: string; admin?: boolean } }> = async (_, { input }) => {
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
    league.users.push({ id: userId, league, user, admin });
    await league.save();
    return {
      league,
      httpStatus: 200,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};


// Resolver to get members of a league
export const getMembersOfLeague: GraphQLFieldResolver<unknown, MyContext, { leagueId: string }> = async (_, { leagueId }) => {
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

// Export your resolvers
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
  },
};

