"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1Service = void 0;
const axios_1 = __importDefault(require("axios"));
class F1Service {
    constructor() {
        this.baseUrl = 'http://ergast.com/api/f1';
    }
    async getDriverStandings(season = 'current') {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/${season}/driverStandings.json`);
            return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        }
        catch (error) {
            throw new Error('Failed to fetch driver standings');
        }
    }
    async getRaceResults(season, round) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/${season}/${round}/results.json`);
            return response.data.MRData.RaceTable.Races[0];
        }
        catch (error) {
            throw new Error('Failed to fetch race results');
        }
    }
    async getDriverInfo(driverId) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/drivers/${driverId}.json`);
            return response.data.MRData.DriverTable.Drivers[0];
        }
        catch (error) {
            throw new Error('Failed to fetch driver info');
        }
    }
    async getRaceSchedule(season = 'current') {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/${season}.json`);
            return response.data.MRData.RaceTable.Races;
        }
        catch (error) {
            throw new Error('Failed to fetch race schedule');
        }
    }
    async getConstructorStandings(season = 'current') {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/${season}/constructorStandings.json`);
            return response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        }
        catch (error) {
            throw new Error('Failed to fetch constructor standings');
        }
    }
}
exports.F1Service = F1Service;
//# sourceMappingURL=f1.service.js.map