import { GraphQLFieldResolver } from 'graphql';
import { MyContext } from '../types/MyContext';
import GPClassement from '../models/Gpclassement';

export class GPClassementResolver {
  // Créer un nouveau classement pour un GP
  createGPClassement: GraphQLFieldResolver<any, MyContext> = async (_, { input }, context) => {
    try {
      if (!context.user) {
        throw new Error('User not authenticated');
      }

      const gpClassement = new GPClassement({
        gp: input.gpId,
        user: context.user._id,
        predictedDrivers: input.predictedDrivers,
        score: 0, // Score initial
        createdAt: new Date()
      });

      await gpClassement.save();
      return gpClassement;
    } catch (error) {
      console.error('Error creating GP classement:', error);
      throw error;
    }
  };

  // Mettre à jour le résultat et le score
  updateGPClassementResult: GraphQLFieldResolver<any, MyContext> = async (_, { input }) => {
    try {
      const gpClassement = await GPClassement.findById(input.classementId);
      if (!gpClassement) {
        throw new Error('GP classement not found');
      }

      gpClassement.actualResult = {
        position: input.position,
        points: input.points
      };
      gpClassement.score = input.score;

      await gpClassement.save();
      return gpClassement;
    } catch (error) {
      console.error('Error updating GP classement result:', error);
      throw error;
    }
  };

  // Obtenir le classement d'un GP
  getGPClassement: GraphQLFieldResolver<any, MyContext> = async (_, { gpId }) => {
    try {
      return await GPClassement.find({ gp: gpId })
        .populate('user', 'username')
        .populate('gp')
        .sort('-score');
    } catch (error) {
      console.error('Error getting GP classement:', error);
      throw error;
    }
  };

  // Obtenir les classements d'un utilisateur
  getUserClassements: GraphQLFieldResolver<any, MyContext> = async (_, { userId }) => {
    try {
      return await GPClassement.find({ user: userId })
        .populate('gp')
        .sort('-createdAt');
    } catch (error) {
      console.error('Error getting user classements:', error);
      throw error;
    }
  };
}

// Export des resolvers
export const gpClassementResolvers = {
  Query: {
    gpClassement: new GPClassementResolver().getGPClassement,
    userClassements: new GPClassementResolver().getUserClassements,
  },
  Mutation: {
    createGPClassement: new GPClassementResolver().createGPClassement,
    updateGPClassementResult: new GPClassementResolver().updateGPClassementResult,
  }
};
