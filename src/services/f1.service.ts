import axios from 'axios';

export class F1Service {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.openf1.org/v1';
  }

  // Récupérer les informations des pilotes
  async getDrivers(session_key?: number) {
    try {
      let url = `${this.baseUrl}/drivers`;
      if (session_key) {
        url += `?session_key=${session_key}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des pilotes:', error);
      throw error;
    }
  }

  // Récupérer les informations de la session
  async getSessions(year?: number, round?: number, session_type?: string) {
    try {
      let url = `${this.baseUrl}/sessions`;
      const params = [];
      
      if (year) params.push(`year=${year}`);
      if (round) params.push(`round=${round}`);
      if (session_type) params.push(`session_type=${session_type}`);
      
      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      throw error;
    }
  }

  // Récupérer les temps au tour
  async getLapTimes(session_key: number, driver_number?: number) {
    try {
      let url = `${this.baseUrl}/laps?session_key=${session_key}`;
      if (driver_number) {
        url += `&driver_number=${driver_number}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des temps au tour:', error);
      throw error;
    }
  }

  // Récupérer les positions des voitures
  async getCarData(session_key: number, driver_number?: number) {
    try {
      let url = `${this.baseUrl}/car_data?session_key=${session_key}`;
      if (driver_number) {
        url += `&driver_number=${driver_number}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des voitures:', error);
      throw error;
    }
  }

  // Récupérer le statut de la piste
  async getTrackStatus(session_key: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/track_status?session_key=${session_key}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du statut de la piste:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les pneus
  async getTyreData(session_key: number, driver_number?: number) {
    try {
      let url = `${this.baseUrl}/tyre_data?session_key=${session_key}`;
      if (driver_number) {
        url += `&driver_number=${driver_number}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des pneus:', error);
      throw error;
    }
  }

  // Récupérer les temps dans les secteurs
  async getSectorTimes(session_key: number, driver_number?: number) {
    try {
      let url = `${this.baseUrl}/timing_data?session_key=${session_key}`;
      if (driver_number) {
        url += `&driver_number=${driver_number}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des temps des secteurs:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les drapeaux
  async getTrackFlags(session_key: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/track_status?session_key=${session_key}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des drapeaux:', error);
      throw error;
    }
  }

  // Récupérer les informations sur les stands
  async getPitData(session_key: number, driver_number?: number) {
    try {
      let url = `${this.baseUrl}/pit_data?session_key=${session_key}`;
      if (driver_number) {
        url += `&driver_number=${driver_number}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données des stands:', error);
      throw error;
    }
  }
}