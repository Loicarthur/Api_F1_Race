import { GraphQLFieldResolver } from 'graphql';
import { F1Service } from '../services/f1.service';

export class F1Resolver {
  private f1Service: F1Service;

  constructor() {
    this.f1Service = new F1Service();
  }

  // Récupérer les données en temps réel d'une voiture
  getCarData: GraphQLFieldResolver<any, any> = async (_, { session_key, driver_number }) => {
    try {
      const carData = await this.f1Service.getCarData(session_key, driver_number);
      return carData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la voiture:', error);
      throw error;
    }
  };

  // Récupérer les temps au tour
  getLapTimes: GraphQLFieldResolver<any, any> = async (_, { session_key, driver_number }) => {
    try {
      const lapTimes = await this.f1Service.getLapTimes(session_key, driver_number);
      return lapTimes;
    } catch (error) {
      console.error('Erreur lors de la récupération des temps au tour:', error);
      throw error;
    }
  };

  // Récupérer le statut de la piste
  getTrackStatus: GraphQLFieldResolver<any, any> = async (_, { session_key }) => {
    try {
      const trackStatus = await this.f1Service.getTrackStatus(session_key);
      return trackStatus;
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de la piste:', error);
      throw error;
    }
  };

  // Récupérer les informations sur les pneus
  getTyreData: GraphQLFieldResolver<any, any> = async (_, { session_key, driver_number }) => {
    try {
      const tyreData = await this.f1Service.getTyreData(session_key, driver_number);
      return tyreData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des pneus:', error);
      throw error;
    }
  };

  // Récupérer les temps dans les secteurs
  getSectorTimes: GraphQLFieldResolver<any, any> = async (_, { session_key, driver_number }) => {
    try {
      const sectorTimes = await this.f1Service.getSectorTimes(session_key, driver_number);
      return sectorTimes;
    } catch (error) {
      console.error('Erreur lors de la récupération des temps des secteurs:', error);
      throw error;
    }
  };

  // Récupérer les informations sur les drapeaux
  getTrackFlags: GraphQLFieldResolver<any, any> = async (_, { session_key }) => {
    try {
      const trackFlags = await this.f1Service.getTrackFlags(session_key);
      return trackFlags;
    } catch (error) {
      console.error('Erreur lors de la récupération des drapeaux:', error);
      throw error;
    }
  };

  // Récupérer les informations sur les stands
  getPitData: GraphQLFieldResolver<any, any> = async (_, { session_key, driver_number }) => {
    try {
      const pitData = await this.f1Service.getPitData(session_key, driver_number);
      return pitData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des stands:', error);
      throw error;
    }
  };

  // Récupérer les informations des pilotes
  getDrivers: GraphQLFieldResolver<any, any> = async (_, { session_key }) => {
    try {
      const drivers = await this.f1Service.getDrivers(session_key);
      return drivers;
    } catch (error) {
      console.error('Erreur lors de la récupération des pilotes:', error);
      throw error;
    }
  };

  // Récupérer les informations de session
  getSessions: GraphQLFieldResolver<any, any> = async (_, { year, round, session_type }) => {
    try {
      const sessions = await this.f1Service.getSessions(year, round, session_type);
      return sessions;
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      throw error;
    }
  };

  // Récupérer les détails d'une session spécifique
  getSessionDetails: GraphQLFieldResolver<any, any> = async (_, { session_key }) => {
    try {
      const [drivers, lapTimes, trackStatus, carData] = await Promise.all([
        this.f1Service.getDrivers(session_key),
        this.f1Service.getLapTimes(session_key),
        this.f1Service.getTrackStatus(session_key),
        this.f1Service.getCarData(session_key)
      ]);

      return {
        drivers,
        lapTimes,
        trackStatus,
        carData
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la session:', error);
      throw error;
    }
  };
}
