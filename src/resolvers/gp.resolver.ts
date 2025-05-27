import { GraphQLFieldResolver } from 'graphql';
import { MyContext } from '../types/MyContext';
import fetchAndSaveLatestGP from '../services/gp.service';

export class GPResolver {
  // Mutation: synchroniser les Grands Prix depuis l'API externe
  syncLatestGP: GraphQLFieldResolver<any, MyContext> = async (_, __, _context) => {
    try {
      await fetchAndSaveLatestGP(); // Appelle le service pour récupérer et sauvegarder les GPs
      return { success: true, message: 'GP data synchronized successfully!' };
    } catch (error) {
      console.error('Error synchronizing GP data:', error);
      return { success: false, message: 'Failed to synchronize GP data.' };
    }
  };
}

export const gpResolvers = {
  Mutation: {
    syncLatestGP: new GPResolver().syncLatestGP,
  },
};