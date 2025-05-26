import axios from "axios";
import Driver from "../models/Driver";
import { EcurieModel } from "../models/Ecurie";

const fetchAndUpdateDriversAndEcuries = async () => {
  try {
    // Étape 1 : Récupérer les données générales des pilotes depuis l'API externe
    const response = await axios.get("https://api.openf1.org/v1/drivers");
    const driversFromApi = response.data;

    const ecuriesMap: { [key: string]: any } = {};

    // Étape 2 : Récupérer les détails de chaque pilote avec `driver_number` et `session_key`
    const driversToInsert = await Promise.all(
      driversFromApi.map(async (driver: any) => {
        // Construire l'URL pour récupérer les détails du pilote
        const driverDetailsResponse = await axios.get(
          `https://api.openf1.org/v1/drivers?driver_number=${driver.driver_number}&session_key=latest`
        );
        const driverDetails = driverDetailsResponse.data;

        // Ajouter les informations de l'écurie dans le map
        if (driver.team_name) {
          if (!ecuriesMap[driver.team_name]) {
            ecuriesMap[driver.team_name] = {
              name: driver.team_name,
              logoUrl: driver.team_logo_url,
              color: driver.team_colour,
              drivers: [],
            };
          }
          ecuriesMap[driver.team_name].drivers.push(driver.name_acronym);
        }

        // Retourner les données du pilote
        return {
          name: driverDetails.full_name || driver.full_name,
          picture: driverDetails.headshot_url || driver.headshot_url,
          trigram: driverDetails.name_acronym || driver.name_acronym,
          driver_number: driver.driver_number,
        };
      })
    );

    // Étape 3 : Insérer ou mettre à jour les écuries dans MongoDB
    for (const ecurieName in ecuriesMap) {
      const ecurie = ecuriesMap[ecurieName];
      const savedEcurie = await EcurieModel.findOneAndUpdate(
        { name: ecurie.name },
        {
          name: ecurie.name,
          logoUrl: ecurie.logoUrl,
          color: ecurie.color,
        },
        { upsert: true, new: true }
      );

      ecuriesMap[ecurieName].id = savedEcurie._id;
    }

    // Étape 4 : Insérer ou mettre à jour les pilotes dans MongoDB
    for (const driver of driversToInsert) {
      const ecurieId = Object.values(ecuriesMap).find((ecurie: any) =>
        ecurie.drivers.includes(driver.trigram)
      )?.id;

      if (ecurieId) {
        const savedDriver = await Driver.findOneAndUpdate(
          { trigram: driver.trigram },
          { ...driver, ecurie: ecurieId },
          { upsert: true, new: true }
        );

        await EcurieModel.findByIdAndUpdate(
          ecurieId,
          { $addToSet: { drivers: savedDriver._id } }, // Ajoute le pilote à la liste des pilotes de l'écurie
          { new: true }
        );
      }
    }

    console.log("Drivers and Ecuries synchronized successfully!");
  } catch (error) {
    console.error("Error fetching or updating drivers and ecuries:", error);
  }
};

export default fetchAndUpdateDriversAndEcuries;