"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1HistoryResolver = void 0;
const f1_history_service_1 = require("../services/f1-history.service");
class F1HistoryResolver {
    constructor() {
        this.getPastRaceResults = async (_, { season, competition = 'F1' }) => {
            try {
                const response = await this.f1HistoryService.getRaceResults(undefined, season, 'Race', competition);
                const raceResults = response.response.map((race) => ({
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
                    results: race.races.map((result) => ({
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
            }
            catch (error) {
                console.error('Erreur lors de la récupération des résultats de course:', error);
                throw error;
            }
        };
        this.getRaceDetails = async (_, { raceId }) => {
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
                    results: race.races.map((result) => ({
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
            }
            catch (error) {
                console.error('Erreur lors de la récupération des détails de la course:', error);
                throw error;
            }
        };
        this.f1HistoryService = new f1_history_service_1.F1HistoryService();
    }
}
exports.F1HistoryResolver = F1HistoryResolver;
//# sourceMappingURL=f1-history.resolver.js.map