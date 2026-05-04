import axios from 'axios';
import GP from '../models/Gpclassement';
import { externalApiToken } from '../config/connectionDB';
import { logger } from '../utils/logger';

const fetchAndSaveLatestGP = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${externalApiToken}`,
    };

    const response = await axios.get('https://f1-api.demo.mds-paris.yt/api/gp/latest', { headers });

    if (!response.data || !Array.isArray(response.data)) {
      logger.error('Invalid data format received from GP API');
      return;
    }

    const gpData = response.data;

    for (const gp of gpData) {
      const { position, driver, team, number, scraped_at } = gp;

      // Vérifier si le GP existe déjà dans la base de données
      const existingGP = await GP.findOne({ position, driver, team, number });
      if (existingGP) {
        // Ne rien afficher
        continue;
      }

      const newGP = new GP({
        position,
        driver,
        team,
        number,
        scraped_at: new Date(scraped_at),
      });

      await newGP.save();
      // Ne rien afficher ici non plus
    }

    logger.info('All GP data processed successfully');
  } catch (error) {
    logger.error('Error fetching or saving GP data', { error });
  }
};

export default fetchAndSaveLatestGP;
