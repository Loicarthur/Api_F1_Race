"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1Service = void 0;
const axios_1 = __importDefault(require("axios"));
class F1Service {
    constructor() {
        this.baseUrl = 'https://api.openf1.org/v1';
    }
    async getDrivers(session_key) {
        try {
            let url = `${this.baseUrl}/drivers`;
            if (session_key) {
                url += `?session_key=${session_key}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des pilotes:', error);
            throw error;
        }
    }
    async getCurrentDrivers() {
        try {
            const currentYear = new Date().getFullYear();
            const response = await axios_1.default.get(`${this.baseUrl}/drivers?year=${currentYear}`);
            return response.data.map((driver) => ({
                driverId: driver.driver_number.toString(),
                code: driver.driver_code,
                firstName: driver.first_name,
                lastName: driver.last_name,
                dateOfBirth: driver.date_of_birth,
                nationality: driver.nationality,
                team: driver.team_name
            }));
        }
        catch (error) {
            console.error('Erreur lors de la récupération des pilotes actuels:', error);
            throw error;
        }
    }
    async getSessions(year, round, session_type) {
        try {
            let url = `${this.baseUrl}/sessions`;
            const params = [];
            if (year)
                params.push(`year=${year}`);
            if (round)
                params.push(`round=${round}`);
            if (session_type)
                params.push(`session_type=${session_type}`);
            if (params.length > 0) {
                url += '?' + params.join('&');
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des sessions:', error);
            throw error;
        }
    }
    async getLapTimes(session_key, driver_number) {
        try {
            let url = `${this.baseUrl}/laps?session_key=${session_key}`;
            if (driver_number) {
                url += `&driver_number=${driver_number}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des temps au tour:', error);
            throw error;
        }
    }
    async getCarData(session_key, driver_number) {
        try {
            let url = `${this.baseUrl}/car_data?session_key=${session_key}`;
            if (driver_number) {
                url += `&driver_number=${driver_number}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données des voitures:', error);
            throw error;
        }
    }
    async getTrackStatus(session_key) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/track_status?session_key=${session_key}`);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération du statut de la piste:', error);
            throw error;
        }
    }
    async getTyreData(session_key, driver_number) {
        try {
            let url = `${this.baseUrl}/tyre_data?session_key=${session_key}`;
            if (driver_number) {
                url += `&driver_number=${driver_number}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données des pneus:', error);
            throw error;
        }
    }
    async getSectorTimes(session_key, driver_number) {
        try {
            let url = `${this.baseUrl}/timing_data?session_key=${session_key}`;
            if (driver_number) {
                url += `&driver_number=${driver_number}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des temps des secteurs:', error);
            throw error;
        }
    }
    async getTrackFlags(session_key) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/track_status?session_key=${session_key}`);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des drapeaux:', error);
            throw error;
        }
    }
    async getPitData(session_key, driver_number) {
        try {
            let url = `${this.baseUrl}/pit_data?session_key=${session_key}`;
            if (driver_number) {
                url += `&driver_number=${driver_number}`;
            }
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des données des stands:', error);
            throw error;
        }
    }
}
exports.F1Service = F1Service;
//# sourceMappingURL=f1.service.js.map