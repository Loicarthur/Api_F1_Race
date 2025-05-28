import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/schema';
import connectDB from './config/database';
import { port } from './config/connectionDB';
import cron from 'node-cron';
import fetchAndUpdateDrivers from './services/driver.service';
import fetchAndSaveLatestGP from './services/gp.service';
import client from 'prom-client';

// Define a Prometheus counter for GraphQL requests
const graphqlRequestCounter = new client.Counter({
  name: 'graphql_requests_total',
  help: 'Total number of GraphQL POST requests to the root endpoint'
});

// Créer l'application Express
const app = express();

// Activer CORS
app.use(cors());

// Prometheus metrics
client.collectDefaultMetrics();
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});


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

    app.use((req, _res, next) => {
  if (req.path === '/' && req.method === 'POST') {
    graphqlRequestCounter.inc();
  }
  next();
});
    // Configuration de l'endpoint GraphQL
    app.use('/', graphqlHTTP({ schema, graphiql: true }));

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Serveur GraphQL démarré sur http://localhost:${port}`);
      console.log(`Prometheus metrics exposées sur http://localhost:${port}/metrics`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });