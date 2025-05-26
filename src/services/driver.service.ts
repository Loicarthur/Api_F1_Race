import axios from "axios";
import Driver from "../models/Driver";

const fetchAndUpdateDrivers = async () => {
  try {
    // Étape 1 : Récupérer les données depuis l'API externe
    const response = await axios.get("https://api.openf1.org/v1/drivers");
    const driversFromApi = response.data; // Assurez-vous que la structure des données est correcte

    // Étape 2 : Mapper les données de l'API au modèle Driver
    const driversToInsert = driversFromApi.map((driver: any) => ({
      name: driver.full_name, // Champ `full_name` de l'API mappé au champ `name` du modèle
      picture: driver.headshot_url, // Champ `headshot_url` de l'API mappé au champ `picture`
      trigram: driver.name_acronym, // Champ `name_acronym` de l'API mappé au champ `trigram`
    }));

    // Étape 3 : Insérer ou mettre à jour les données dans MongoDB
    for (const driver of driversToInsert) {
      await Driver.findOneAndUpdate(
        { trigram: driver.trigram }, // Identifier le pilote par son trigram
        driver, // Mettre à jour les données
        { upsert: true, new: true } // Insérer si le pilote n'existe pas
      );
    }

    console.log("Drivers updated successfully!");
  } catch (error) {
    console.error("Error fetching or updating drivers:", error);
  }
};

export default fetchAndUpdateDrivers;