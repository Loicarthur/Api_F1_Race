import { GraphQLFieldResolver } from 'graphql';
import { MyContext } from '../types/MyContext';
import fetchAndSaveLatestGP from '../services/gp.service';
import GP from '../models/Gpclassement';
import { logger } from '../utils/logger';

export class GPResolver {
  getGPs: GraphQLFieldResolver<any, MyContext> = async () => {
    return await GP.find();
  };

  syncLatestGP: GraphQLFieldResolver<any, MyContext> = async () => {
    try {
      await fetchAndSaveLatestGP();
      return { success: true, message: 'GP data synchronized successfully.' };
    } catch (error) {
      logger.error('Error synchronizing GP data', { error });
      return { success: false, message: 'Failed to synchronize GP data.' };
    }
  };
}

export const gpClassementResolvers = {
  Query: {
    gpClassement: new GPResolver().getGPs,
  },
  Mutation: {
    syncLatestGP: new GPResolver().syncLatestGP,
  },
};
