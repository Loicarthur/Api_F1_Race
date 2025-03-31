"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1HistoryService = void 0;
const axios_1 = __importDefault(require("axios"));
class F1HistoryService {
    constructor() {
        this.baseUrl = 'https://v1.formula-1.api-sports.io';
        this.apiKey = process.env.API_SPORTS_KEY || '';
    }
    get headers() {
        return {
            'x-apisports-key': this.apiKey
        };
    }
    async getRaceResults(id, season, type, competition) {
        try {
            const params = {};
            if (id)
                params.id = id;
            if (season)
                params.season = season;
            if (type)
                params.type = type;
            if (competition)
                params.competition = competition;
            const response = await axios_1.default.get(`${this.baseUrl}/races`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des résultats de course:', error);
            throw error;
        }
    }
    async getDrivers(id, search, team) {
        try {
            const params = {};
            if (id)
                params.id = id;
            if (search)
                params.search = search;
            if (team)
                params.team = team;
            const response = await axios_1.default.get(`${this.baseUrl}/drivers`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des informations des pilotes:', error);
            throw error;
        }
    }
    async getTeams(id, search, season) {
        try {
            const params = {};
            if (id)
                params.id = id;
            if (search)
                params.search = search;
            if (season)
                params.season = season;
            const response = await axios_1.default.get(`${this.baseUrl}/teams`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des informations des équipes:', error);
            throw error;
        }
    }
    async getCircuits(id, search, competition) {
        try {
            const params = {};
            if (id)
                params.id = id;
            if (search)
                params.search = search;
            if (competition)
                params.competition = competition;
            const response = await axios_1.default.get(`${this.baseUrl}/circuits`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des informations des circuits:', error);
            throw error;
        }
    }
    async getRankings(type, season) {
        try {
            const params = {};
            if (season)
                params.season = season;
            const response = await axios_1.default.get(`${this.baseUrl}/rankings/${type}`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des classements:', error);
            throw error;
        }
    }
    async getCompetitions(id, search, type) {
        try {
            const params = {};
            if (id)
                params.id = id;
            if (search)
                params.search = search;
            if (type)
                params.type = type;
            const response = await axios_1.default.get(`${this.baseUrl}/competitions`, {
                headers: this.headers,
                params
            });
            return response.data;
        }
        catch (error) {
            console.error('Erreur lors de la récupération des informations des compétitions:', error);
            throw error;
        }
    }
}
exports.F1HistoryService = F1HistoryService;
//# sourceMappingURL=f1-history.service.js.map