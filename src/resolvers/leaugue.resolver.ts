import { GraphQLFieldResolver } from 'graphql';
import { LeagueModel } from '../models/League'; // Modèle pour les ligues
import { MyContext } from '../types/MyContext';

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
    const { leagueType, leagueName, maxParticipants } = args.input;

    // Vérifiez si la ligue existe déjà
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

    const league = new LeagueModel({ leagueType, leagueName, maxParticipants, joinCode });
    await league.save();

    return {
      league: [league], 
      error: null,
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

//Obtient toutes les ligues
export const getAllLeagues: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const leagues = await LeagueModel.find({});
    return leagues; // Retourner le tableau directement
  } catch (error) {
    console.error("Erreur lors de la récupération des ligues :", error);
    throw new Error(error instanceof Error ? error.message : 'Une erreur inattendue est survenue');
  }
};

// Exportez vos résolveurs
export const leagueResolvers = {
  Query: {
    leagues: getAllLeagues,
  },
  Mutation: {
    createLeague,
  },
};