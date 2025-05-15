import { GraphQLFieldResolver } from 'graphql';
import { F1ResultsService } from '../services/f1-results.service';

export class F1ResultsResolver {
  private f1ResultsService: F1ResultsService;

  constructor() {
    this.f1ResultsService = new F1ResultsService();
  }

  // Obtenir tous les résultats
  getAllResults: GraphQLFieldResolver<any, any> = async () => {
    try {
      return await this.f1ResultsService.getAllResults();
    } catch (error) {
      console.error('Erreur dans le resolver getAllResults:', error);
      throw error;
    }
  };

  // Obtenir les résultats d'un GP
  getGpResults: GraphQLFieldResolver<any, any> = async (_, { gpId }) => {
    try {
      return await this.f1ResultsService.getGpResults(gpId);
    } catch (error) {
      console.error('Erreur dans le resolver getGpResults:', error);
      throw error;
    }
  };

  // Obtenir les résultats d'une saison
  getSeasonResults: GraphQLFieldResolver<any, any> = async (_, { season }) => {
    try {
      return await this.f1ResultsService.getSeasonResults(season);
    } catch (error) {
      console.error('Erreur dans le resolver getSeasonResults:', error);
      throw error;
    }
  };

  // Obtenir le dernier résultat
  getLatestResult: GraphQLFieldResolver<any, any> = async () => {
    try {
      return await this.f1ResultsService.getLatestResult();
    } catch (error) {
      console.error('Erreur dans le resolver getLatestResult:', error);
      throw error;
    }
  };

  // Obtenir le calendrier
  getCalendar: GraphQLFieldResolver<any, any> = async (_, { season }) => {
    try {
      return await this.f1ResultsService.getCalendar(season);
    } catch (error) {
      console.error('Erreur dans le resolver getCalendar:', error);
      throw error;
    }
  };

  // Obtenir les stats d'un pilote
  getDriverStats: GraphQLFieldResolver<any, any> = async (_, { driverId }) => {
    try {
      return await this.f1ResultsService.getDriverStats(driverId);
    } catch (error) {
      console.error('Erreur dans le resolver getDriverStats:', error);
      throw error;
    }
  };

  // Obtenir le classement des pilotes
  getDriverStandings: GraphQLFieldResolver<any, any> = async (_, { season }) => {
    try {
      return await this.f1ResultsService.getDriverStandings(season);
    } catch (error) {
      console.error('Erreur dans le resolver getDriverStandings:', error);
      throw error;
    }
  };

  // Obtenir le classement des constructeurs
  getConstructorStandings: GraphQLFieldResolver<any, any> = async (_, { season }) => {
    try {
      return await this.f1ResultsService.getConstructorStandings(season);
    } catch (error) {
      console.error('Erreur dans le resolver getConstructorStandings:', error);
      throw error;
    }
  };
}

export const f1ResultsResolvers = {
  Query: {
    f1Results: new F1ResultsResolver().getAllResults,
    f1GpResults: new F1ResultsResolver().getGpResults,
    f1SeasonResults: new F1ResultsResolver().getSeasonResults,
    f1LatestResult: new F1ResultsResolver().getLatestResult,
    f1Calendar: new F1ResultsResolver().getCalendar,
    f1DriverStats: new F1ResultsResolver().getDriverStats,
    f1DriverStandings: new F1ResultsResolver().getDriverStandings,
    f1ConstructorStandings: new F1ResultsResolver().getConstructorStandings,
  }
};
