"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1Resolver = void 0;
const f1_service_1 = require("../services/f1.service");
const Driver_1 = __importDefault(require("../models/Driver"));
class F1Resolver {
    constructor() {
        this.getCarData = async (_, { session_key, driver_number }) => {
            try {
                const carData = await this.f1Service.getCarData(session_key, driver_number);
                return carData;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des données de la voiture:', error);
                throw error;
            }
        };
        this.getLapTimes = async (_, { session_key, driver_number }) => {
            try {
                const lapTimes = await this.f1Service.getLapTimes(session_key, driver_number);
                return lapTimes;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des temps au tour:', error);
                throw error;
            }
        };
        this.getTrackStatus = async (_, { session_key }) => {
            try {
                const trackStatus = await this.f1Service.getTrackStatus(session_key);
                return trackStatus;
            }
            catch (error) {
                console.error('Erreur lors de la récupération du statut de la piste:', error);
                throw error;
            }
        };
        this.getTyreData = async (_, { session_key, driver_number }) => {
            try {
                const tyreData = await this.f1Service.getTyreData(session_key, driver_number);
                return tyreData;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des données des pneus:', error);
                throw error;
            }
        };
        this.getSectorTimes = async (_, { session_key, driver_number }) => {
            try {
                const sectorTimes = await this.f1Service.getSectorTimes(session_key, driver_number);
                return sectorTimes;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des temps des secteurs:', error);
                throw error;
            }
        };
        this.getTrackFlags = async (_, { session_key }) => {
            try {
                const trackFlags = await this.f1Service.getTrackFlags(session_key);
                return trackFlags;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des drapeaux:', error);
                throw error;
            }
        };
        this.getPitData = async (_, { session_key, driver_number }) => {
            try {
                const pitData = await this.f1Service.getPitData(session_key, driver_number);
                return pitData;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des données des stands:', error);
                throw error;
            }
        };
        this.getDrivers = async () => {
            try {
                const drivers = await Driver_1.default.find().sort({ lastName: 1 });
                return drivers;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des pilotes:', error);
                throw error;
            }
        };
        this.getSessions = async (_, { year, round, session_type }) => {
            try {
                const sessions = await this.f1Service.getSessions(year, round, session_type);
                return sessions;
            }
            catch (error) {
                console.error('Erreur lors de la récupération des sessions:', error);
                throw error;
            }
        };
        this.getSessionDetails = async (_, { session_key }) => {
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
            }
            catch (error) {
                console.error('Erreur lors de la récupération des détails de la session:', error);
                throw error;
            }
        };
        this.f1Service = new f1_service_1.F1Service();
    }
}
exports.F1Resolver = F1Resolver;
//# sourceMappingURL=f1.resolver.js.map