import { GraphQLFieldResolver } from 'graphql';
import { MyContext } from '../types/MyContext';
import { GpClassement } from '../models/Gpclassement';

export class GpClassementResolver {
  // Créer un nouveau classement pour un GP
  createGpClassement: GraphQLFieldResolver<any, MyContext> = async (_, { input }, context) => {
    try {
      if (!context.user) {
        throw new Error('User not authenticated');
      }

      const gpClassement = new GpClassement({
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
  updateGpClassementResult: GraphQLFieldResolver<any, MyContext> = async (_, { input }) => {
    try {
      const gpClassement = await GpClassement.findById(input.classementId);
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
  getGpClassement: GraphQLFieldResolver<any, MyContext> = async (_, { gpId }) => {
    try {
      return await GpClassement.find({ gp: gpId })
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
      return await GpClassement.find({ user: userId })
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
    gpClassement: new GpClassementResolver().getGpClassement,
    userClassements: new GpClassementResolver().getUserClassements,
  },
  Mutation: {
    createGpClassement: new GpClassementResolver().createGpClassement,
    updateGpClassementResult: new GpClassementResolver().updateGpClassementResult,
  }
};
