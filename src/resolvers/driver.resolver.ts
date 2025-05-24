import { GraphQLFieldResolver } from 'graphql';
import Driver from '../models/Driver';
import { MyContext } from '../types/MyContext';

export class DriverResolver {
  // Query: récupérer tous les pilotes
  getDrivers: GraphQLFieldResolver<any, MyContext> = async () => {
    return await Driver.find().populate('ecurie');
  };

  // Query: récupérer un pilote par son id
  getDriver: GraphQLFieldResolver<any, MyContext> = async (_, { id }) => {
    return await Driver.findById(id).populate('ecurie');
  };

  // Mutation: créer un pilote
  createDriver: GraphQLFieldResolver<any, MyContext> = async (_, { input }, context) => {
    // Vérifie que l'utilisateur est admin
    if (!context.user || context.user.role !== 'admin') {
      throw new Error('Access denied. Admin role required.');
    }
    const driver = new Driver(input);
    await driver.save();
    return driver;
  };

  // Mutation: supprimer un pilote
  deleteDriver: GraphQLFieldResolver<any, MyContext> = async (_, { id }, context) => {
    // Vérifie que l'utilisateur est admin
    if (!context.user || context.user.role !== 'admin') {
      throw new Error('Access denied. Admin role required.');
    }
    return await Driver.findByIdAndDelete(id);
  };

}

export const driverResolvers = {
  Query: {
    drivers: new DriverResolver().getDrivers,
    driver: new DriverResolver().getDriver,
  },
  Mutation: {
    createDriver: new DriverResolver().createDriver,
    deleteDriver: new DriverResolver().deleteDriver,
  }
};
