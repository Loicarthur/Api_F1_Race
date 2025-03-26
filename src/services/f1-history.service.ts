import axios from 'axios';

export class F1HistoryService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = 'https://v1.formula-1.api-sports.io';
    this.apiKey = process.env.API_SPORTS_KEY || '';
  }

  private get headers() {
    return {
      'x-apisports-key': this.apiKey
    };
  }

  // Récupérer les résultats d'une course spécifique
  async getRaceResults(id?: number, season?: number, type?: string, competition?: string) {
    try {
      const params: any = {};
      if (id) params.id = id;
      if (season) params.season = season;
      if (type) params.type = type;
      if (competition) params.competition = competition;

      const response = await axios.get(`${this.baseUrl}/races`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats de course:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les pilotes
  async getDrivers(id?: number, search?: string, team?: string) {
    try {
      const params: any = {};
      if (id) params.id = id;
      if (search) params.search = search;
      if (team) params.team = team;

      const response = await axios.get(`${this.baseUrl}/drivers`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations des pilotes:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les équipes
  async getTeams(id?: number, search?: string, season?: number) {
    try {
      const params: any = {};
      if (id) params.id = id;
      if (search) params.search = search;
      if (season) params.season = season;

      const response = await axios.get(`${this.baseUrl}/teams`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations des équipes:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les circuits
  async getCircuits(id?: number, search?: string, competition?: string) {
    try {
      const params: any = {};
      if (id) params.id = id;
      if (search) params.search = search;
      if (competition) params.competition = competition;

      const response = await axios.get(`${this.baseUrl}/circuits`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations des circuits:', error);
      throw error;
    }
  }

  // Récupérer les classements
  async getRankings(type: 'drivers' | 'teams', season?: number) {
    try {
      const params: any = {};
      if (season) params.season = season;

      const response = await axios.get(`${this.baseUrl}/rankings/${type}`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des classements:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les compétitions
  async getCompetitions(id?: number, search?: string, type?: string) {
    try {
      const params: any = {};
      if (id) params.id = id;
      if (search) params.search = search;
      if (type) params.type = type;

      const response = await axios.get(`${this.baseUrl}/competitions`, {
        headers: this.headers,
        params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations des compétitions:', error);
      throw error;
    }
  }
}
