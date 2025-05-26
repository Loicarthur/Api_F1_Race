import cron from 'node-cron';
import { syncUpcomingGPsFromErgast } from './ergast-gp-sync.service';

export class SyncService {

  // Synchronise les pilotes une fois par jour et les GP à venir chaque mois
  public initializeSync(): void {
    // Exécute la synchronisation au démarrage
    this.syncUpcomingGPsInternal();

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
}
export const syncService = new SyncService();
