"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncService = exports.SyncService = void 0;
const Driver_1 = __importDefault(require("../models/Driver"));
const f1_service_1 = require("./f1.service");
const node_cron_1 = __importDefault(require("node-cron"));
class SyncService {
    constructor() {
        this.f1Service = new f1_service_1.F1Service();
    }
    initializeSync() {
        this.syncDrivers();
        node_cron_1.default.schedule('0 0 * * *', async () => {
            await this.syncDrivers();
        });
    }
    async syncDrivers() {
        try {
            console.log('Starting drivers sync...');
            const drivers = await this.f1Service.getCurrentDrivers();
            for (const driver of drivers) {
                await Driver_1.default.findOneAndUpdate({ driverId: driver.driverId }, {
                    code: driver.code,
                    firstName: driver.firstName,
                    lastName: driver.lastName,
                    dateOfBirth: driver.dateOfBirth,
                    nationality: driver.nationality,
                    team: driver.team,
                    lastUpdated: new Date()
                }, { upsert: true });
            }
            console.log('Drivers sync completed successfully');
        }
        catch (error) {
            console.error('Error syncing drivers:', error);
        }
    }
}
exports.SyncService = SyncService;
exports.syncService = new SyncService();
//# sourceMappingURL=sync.service.js.map