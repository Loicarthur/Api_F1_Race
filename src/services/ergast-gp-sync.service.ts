import axios from 'axios';
import GP from '../models/Gp';

/**
 * Synchronise les GP à venir depuis l'API Ergast (jolpi.ca)
 * @param year Année de la saison à synchroniser (ex: 2025). Si non fourni, utilise la saison courante.
 * @returns Liste des GP synchronisés (créés ou mis à jour)
 */
/**
 * Récupère la liste des courses d'une saison F1 depuis l'API Ergast (jolpi.ca)
 * @param year Année de la saison (ex: 2025). Si non fourni, saison courante
 * @returns Tableau des courses (races)
 */
export async function fetchSeasonData(year?: number): Promise<any[]> {
  const season = year ? year : 'current';
  const url = `https://api.jolpi.ca/ergast/f1/${season}.json`;
  const res = await axios.get(url);
  return res.data?.MRData?.RaceTable?.Races || [];
}

/**
 * Synchronise les GP à venir depuis l'API Ergast (jolpi.ca)
 * @param year Année de la saison à synchroniser (ex: 2025). Si non fourni, utilise la saison courante.
 * @returns Liste des GP synchronisés (créés ou mis à jour)
 */
export async function syncUpcomingGPsFromErgast(year?: number) {
  const races = await fetchSeasonData(year);
  const syncedGPs = [];

  for (const race of races) {
    // On ne traite que les courses à venir (date future)
    if (new Date(race.date) > new Date()) {
      const updated = await GP.findOneAndUpdate(
        { name: race.raceName, round: race.round, dateTime: race.date },
        {
          name: race.raceName,
          round: race.round,
          dateTime: race.date,
          track: race.track,
          drivers: race.drivers,
          classement: race.classement,
          mainRaceResults: race.mainRaceResults,
          sessionType: race.sessionType,
          flag: race.flag,
        },
        { upsert: true, new: true }
      );
      syncedGPs.push(updated);
    }
  }
  return syncedGPs;
}

