import axios from "axios";
import Driver from "../models/Driver";
import { EcurieModel } from "../models/Ecurie";

const fetchAndUpdateDriversAndEcuries = async () => {
  try {
    const response = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
    const driversFromApi = response.data;

    const ecuriesMap: { [key: string]: any } = {};

    const driversToInsert = driversFromApi.map((driver: any) => {
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

      return {
        name: driver.full_name,
        picture: driver.headshot_url,
        trigram: driver.name_acronym,
      };
    });

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
          { $addToSet: { drivers: savedDriver._id } },
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
