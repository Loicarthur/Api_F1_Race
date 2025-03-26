import { GraphQLFieldResolver } from 'graphql';
import { F1HistoryService } from '../services/f1-history.service';

export class F1HistoryResolver {
  private f1HistoryService: F1HistoryService;

  constructor() {
    this.f1HistoryService = new F1HistoryService();
  }

  // Récupérer les résultats d'une course passée
  getPastRaceResults: GraphQLFieldResolver<any, any> = async (_, { season, competition = 'F1' }) => {
    try {
      // Récupérer les résultats de course pour la saison et la compétition spécifiées
      const response = await this.f1HistoryService.getRaceResults(
        undefined, // id
        season,
        'Race',   // type de session
        competition
      );

      // Formater la réponse pour inclure les détails importants
      const raceResults = response.response.map((race: any) => ({
        id: race.id,
        competition: race.competition.name,
        circuit: {
          name: race.circuit.name,
          image: race.circuit.image,
          country: race.circuit.country
        },
        season: race.season,
        type: race.type,
        date: race.date,
        timezone: race.timezone,
        results: race.races.map((result: any) => ({
          position: result.position,
          driver: {
            name: result.driver.name,
            number: result.driver.number,
            image: result.driver.image
          },
          team: {
            name: result.team.name,
            logo: result.team.logo
          },
          time: result.time,
          laps: result.laps,
          grid: result.grid,
          points: result.points,
          fastest_lap: result.fastest_lap
        }))
      }));

      return raceResults;
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats de course:', error);
      throw error;
    }
  };

  // Récupérer les détails d'une course spécifique
  getRaceDetails: GraphQLFieldResolver<any, any> = async (_, { raceId }) => {
    try {
      const response = await this.f1HistoryService.getRaceResults(raceId);
      
      if (!response.response || response.response.length === 0) {
        throw new Error('Course non trouvée');
      }

      const race = response.response[0];
      return {
        id: race.id,
        competition: race.competition.name,
        circuit: {
          name: race.circuit.name,
          image: race.circuit.image,
          country: race.circuit.country
        },
        season: race.season,
        type: race.type,
        date: race.date,
        timezone: race.timezone,
        results: race.races.map((result: any) => ({
          position: result.position,
          driver: {
            name: result.driver.name,
            number: result.driver.number,
            image: result.driver.image
          },
          team: {
            name: result.team.name,
            logo: result.team.logo
          },
          time: result.time,
          laps: result.laps,
          grid: result.grid,
          points: result.points,
          fastest_lap: result.fastest_lap
        }))
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la course:', error);
      throw error;
    }
  };
}