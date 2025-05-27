import axios from 'axios';
import GP from '../models/GpClassement';

const fetchAndSaveLatestGP = async () => {
  try {
    // Ajouter le Bearer Token dans les headers
    const headers = {
      Authorization: `Bearer 2025`, // Inclure le token ici
    };

    // Effectuer une requête GET vers l'API avec les headers
    const response = await axios.get('https://f1-api.demo.mds-paris.yt/api/gp/latest', { headers });

    // Vérifier si les données sont disponibles
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid data format received from API');
      return;
    }

    const gpData = response.data;

    // Parcourir les données et les insérer dans MongoDB
    for (const gp of gpData) {
      const { position, driver, team, number, scraped_at } = gp;

      // Vérifier si le GP existe déjà dans la base de données
      const existingGP = await GP.findOne({ position, driver, team, number });
      if (existingGP) {
        console.log(`GP already exists for driver ${driver} in position ${position}`);
        continue;
      }

      // Créer un nouveau document GP
      const newGP = new GP({
        position,
        driver,
        team,
        number,
        scraped_at: new Date(scraped_at), // Convertir en objet Date
      });

      // Sauvegarder dans la base de données
      await newGP.save();
      console.log(`GP saved for driver ${driver} in position ${position}`);
    }

    console.log('All GP data processed successfully!');
  } catch (error) {
    console.error('Error fetching or saving GP data:', error);
  }
};

export default fetchAndSaveLatestGP;