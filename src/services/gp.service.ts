import axios from 'axios';
import GP from '../models/GpClassement';

const fetchAndSaveLatestGP = async () => {
  try {
    const headers = {
      Authorization: `Bearer 2025`,
    };

    const response = await axios.get('https://f1-api.demo.mds-paris.yt/api/gp/latest', { headers });

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid data format received from API');
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

    console.log('All GP data processed successfully!');
  } catch (error) {
    console.error('Error fetching or saving GP data:', error);
  }
};

export default fetchAndSaveLatestGP;