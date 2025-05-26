import Driver from '../models/Driver';
import { F1Service } from './f1.service';
import cron from 'node-cron';
import { syncUpcomingGPsFromErgast } from './ergast-gp-sync.service';

export class SyncService {
  private f1Service: F1Service;

  constructor() {
    this.f1Service = new F1Service();
  }

  // Synchronise les pilotes une fois par jour et les GP à venir chaque mois
  public initializeSync(): void {
    // Exécute la synchronisation au démarrage
    this.syncDrivers();
    this.syncUpcomingGPsInternal();

    // Synchronisation des pilotes tous les jours à minuit
    cron.schedule('0 0 * * *', async () => {
      await this.syncDrivers();
    });

    // Synchronisation des GP à venir le 1er de chaque mois à 1h du matin
    cron.schedule('0 1 1 * *', async () => {
      await this.syncUpcomingGPsInternal();
    });
  }

  // Synchronise les GP à venir depuis Ergast (mensuel)
  private async syncUpcomingGPsInternal(): Promise<void> {
    try {
      console.log('Starting monthly GP sync...');
      await syncUpcomingGPsFromErgast(); // saison courante
      console.log('GP sync completed successfully');
    } catch (error) {
      console.error('Error syncing GPs:', error);
    }
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
