import { GraphQLFieldResolver } from 'graphql';
import Driver from '../models/Driver';
import { MyContext } from '../types/MyContext';
import fetchAndUpdateDrivers from '../services/driver.service';
import { logger } from '../utils/logger';

export class DriverResolver {
  getDrivers: GraphQLFieldResolver<any, MyContext> = async () => {
    return await Driver.find().populate({
      path: 'ecurie',
      select: 'name color',
    });
  };

  getDriver: GraphQLFieldResolver<any, MyContext> = async (_, { id }) => {
    return await Driver.findById(id).populate({
      path: 'ecurie',
      select: 'name color',
    });
  };

  syncDrivers: GraphQLFieldResolver<any, MyContext> = async () => {
    try {
      await fetchAndUpdateDrivers();
      return { success: true, message: 'Drivers synchronized successfully.' };
    } catch (error) {
      logger.error('Error synchronizing drivers', { error });
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
