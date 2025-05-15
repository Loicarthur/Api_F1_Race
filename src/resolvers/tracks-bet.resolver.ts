import { GraphQLFieldResolver } from 'graphql';
import { MyContext } from '../types/MyContext';
import { TracksBetSelectionResults } from '../models/TracksBetSelectionResults';

export class TracksBetResolver {
  // Créer un nouveau pari
  createBet: GraphQLFieldResolver<any, MyContext> = async (_, { input }, context) => {
    try {
      if (!context.user) {
        throw new Error('User not authenticated');
      }

      const bet = new TracksBetSelectionResults({
        user: context.user._id,
        gp: input.gpId,
        selectedDrivers: {
          firstPlace: input.firstPlace,
          secondPlace: input.secondPlace,
          thirdPlace: input.thirdPlace
        },
        score: 0,
        createdAt: new Date()
      });

      await bet.save();
      return bet;
    } catch (error) {
      console.error('Error creating bet:', error);
      throw error;
    }
  };

  // Mettre à jour le résultat d'un pari
  updateBetResult: GraphQLFieldResolver<any, MyContext> = async (_, { input }) => {
    try {
      const bet = await TracksBetSelectionResults.findById(input.betId);
      if (!bet) {
        throw new Error('Bet not found');
      }

      bet.actualResult = {
        firstPlace: input.firstPlace,
        secondPlace: input.secondPlace,
        thirdPlace: input.thirdPlace
      };

      // Calculer le score
      let score = 0;
      if (bet.selectedDrivers.firstPlace === input.firstPlace) score += 10;
      if (bet.selectedDrivers.secondPlace === input.secondPlace) score += 5;
      if (bet.selectedDrivers.thirdPlace === input.thirdPlace) score += 3;
      bet.score = score;

      await bet.save();
      return bet;
    } catch (error) {
      console.error('Error updating bet result:', error);
      throw error;
    }
  };

  // Obtenir les paris d'un GP
  getGpBets: GraphQLFieldResolver<any, MyContext> = async (_, { gpId }) => {
    try {
      return await TracksBetSelectionResults.find({ gp: gpId })
        .populate('user', 'username')
        .populate('gp')
        .sort('-score');
    } catch (error) {
      console.error('Error getting GP bets:', error);
      throw error;
    }
  };

  // Obtenir les paris d'un utilisateur
  getUserBets: GraphQLFieldResolver<any, MyContext> = async (_, { userId }) => {
    try {
      return await TracksBetSelectionResults.find({ user: userId })
        .populate('gp')
        .sort('-createdAt');
    } catch (error) {
      console.error('Error getting user bets:', error);
      throw error;
    }
  };
}

// Export des resolvers
export const tracksBetResolvers = {
  Query: {
    gpBets: new TracksBetResolver().getGpBets,
    userBets: new TracksBetResolver().getUserBets,
  },
  Mutation: {
    createBet: new TracksBetResolver().createBet,
    updateBetResult: new TracksBetResolver().updateBetResult,
  }
};
