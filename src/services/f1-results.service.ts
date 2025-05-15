import axios from 'axios';

export class F1ResultsService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://f1-api.demo.mds-paris.yt';
  }

  // Obtenir tous les résultats
  async getAllResults() {
    try {
      const response = await axios.get(`${this.baseUrl}/results`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      throw error;
    }
  }

  // Obtenir les résultats d'un GP spécifique
  async getGpResults(gpId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/results/${gpId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des résultats du GP ${gpId}:`, error);
      throw error;
    }
  }

  // Obtenir les résultats d'une saison
  async getSeasonResults(season: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/results/season/${season}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des résultats de la saison ${season}:`, error);
      throw error;
    }
  }

  // Obtenir le dernier résultat (dernier GP)
  async getLatestResult() {
    try {
      const response = await axios.get(`${this.baseUrl}/results/latest`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du dernier résultat:', error);
      throw error;
    }
  }

  // Obtenir le calendrier
  async getCalendar(season?: number) {
    try {
      const url = season 
        ? `${this.baseUrl}/calendar/${season}`
        : `${this.baseUrl}/calendar`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du calendrier:', error);
      throw error;
    }
  }

  // Obtenir les statistiques d'un pilote
  async getDriverStats(driverId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/stats/driver/${driverId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des stats du pilote ${driverId}:`, error);
      throw error;
    }
  }

  // Obtenir le classement des pilotes
  async getDriverStandings(season?: number) {
    try {
      const url = season 
        ? `${this.baseUrl}/standings/drivers/${season}`
        : `${this.baseUrl}/standings/drivers`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du classement des pilotes:', error);
      throw error;
    }
  }

  // Obtenir le classement des constructeurs
  async getConstructorStandings(season?: number) {
    try {
      const url = season 
        ? `${this.baseUrl}/standings/constructors/${season}`
        : `${this.baseUrl}/standings/constructors`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du classement des constructeurs:', error);
      throw error;
    }
  }
}
