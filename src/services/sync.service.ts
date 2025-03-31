import Driver from '../models/Driver';
import { F1Service } from './f1.service';
import cron from 'node-cron';

export class SyncService {
  private f1Service: F1Service;

  constructor() {
    this.f1Service = new F1Service();
  }

  // Synchronise les pilotes une fois par jour
  public initializeSync(): void {
    // Exécute la synchronisation au démarrage
    this.syncDrivers();

    // Configure la tâche CRON pour s'exécuter tous les jours à minuit
    cron.schedule('0 0 * * *', async () => {
      await this.syncDrivers();
    });
  }

  private async syncDrivers(): Promise<void> {
    try {
      console.log('Starting drivers sync...');
      const drivers = await this.f1Service.getCurrentDrivers();

      for (const driver of drivers) {
        await Driver.findOneAndUpdate(
          { driverId: driver.driverId },
          {
            code: driver.code,
            firstName: driver.firstName,
            lastName: driver.lastName,
            dateOfBirth: driver.dateOfBirth,
            nationality: driver.nationality,
            team: driver.team,
            lastUpdated: new Date()
          },
          { upsert: true }
        );
      }
      console.log('Drivers sync completed successfully');
    } catch (error) {
      console.error('Error syncing drivers:', error);
    }
  }
}

export const syncService = new SyncService();
