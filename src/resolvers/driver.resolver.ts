import { GraphQLFieldResolver } from 'graphql';
import Driver from '../models/Driver';
import { MyContext } from '../types/MyContext';
import fetchAndUpdateDrivers from '../services/driver.service';

export class DriverResolver {
  // Query: récupérer tous les pilotes avec leur écurie (sans logoUrl)
  getDrivers: GraphQLFieldResolver<any, MyContext> = async () => {
    return await Driver.find().populate({
      path: 'ecurie', // Inclure les informations de l'écurie
      select: 'name color', // Retirer le champ logoUrl
    });
  };

  // Query: récupérer un pilote par son id avec son écurie (sans logoUrl)
  getDriver: GraphQLFieldResolver<any, MyContext> = async (_, { id }) => {
    return await Driver.findById(id).populate({
      path: 'ecurie', // Inclure les informations de l'écurie
      select: 'name color', // Retirer le champ logoUrl
    });
  };

  // Mutation: synchroniser les pilotes depuis l'API externe
  syncDrivers: GraphQLFieldResolver<any, MyContext> = async (_, __, _context) => {
    try {
      await fetchAndUpdateDrivers(); 
      return { success: true, message: 'Drivers synchronized successfully!' };
    } catch (error) {
      console.error('Error synchronizing drivers:', error);
      return { success: false, message: 'Failed to synchronize drivers.' };
    }
  };
}

export const driverResolvers = {
  Query: {
    drivers: new DriverResolver().getDrivers,
    driver: new DriverResolver().getDriver,
  },
  Mutation: {
    syncDrivers: new DriverResolver().syncDrivers,
  },
};