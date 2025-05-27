import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/schema';
import connectDB from './config/database';
import { port } from './config/connectionDB';
import cron from 'node-cron';
import fetchAndUpdateDrivers from './services/driver.service';
import fetchAndSaveLatestGP from './services/gp.service';

// Créer l'application Express
const app = express();

// Activer CORS
app.use(cors());

// Connexion à MongoDB
connectDB()
  .then(async () => {
    //Synchronisation immédiate des pilotes
    console.log("Synchronisation initiale des pilotes...");
    await fetchAndUpdateDrivers();
    //synchonisation des GP
    console.log('Synchronisation initiale des GPs...');
    await fetchAndSaveLatestGP();

    //Planifier la synchronisation annuelle
    cron.schedule("0 0 1 1 *", async () => {
      console.log("Running yearly driver update...");
      await fetchAndUpdateDrivers();
    });

    // Configuration de l'endpoint GraphQL
    app.use('/', graphqlHTTP({ schema, graphiql: true }));

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Serveur GraphQL démarré sur http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });