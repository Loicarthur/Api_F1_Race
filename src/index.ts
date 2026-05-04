import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import schema from './schema/schema';
import connectDB from './config/database';
import { port } from './config/connectionDB';
import { auth } from './middleware/auth';
import cron from 'node-cron';
import fetchAndUpdateDrivers from './services/driver.service';
import fetchAndSaveLatestGP from './services/gp.service';
import client from 'prom-client';
import { logger } from './utils/logger';

const graphqlRequestCounter = new client.Counter({
  name: 'graphql_requests_total',
  help: 'Total number of GraphQL POST requests to the root endpoint',
});

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Rate limiting HTTP global : 200 requêtes/15min par IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { errors: [{ message: 'Too many requests, please try again later.' }] },
  })
);

client.collectDefaultMetrics();
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(auth);

connectDB()
  .then(() => {
    logger.info('Synchronisation initiale des données en cours...');
    fetchAndUpdateDrivers().catch((err) => logger.error('Erreur sync pilotes', { err }));
    fetchAndSaveLatestGP().catch((err) => logger.error('Erreur sync GP', { err }));

    cron.schedule('0 0 1 1 *', async () => {
      logger.info('Running yearly driver update...');
      await fetchAndUpdateDrivers();
    });

    app.use((req, _res, next) => {
      if (req.path === '/' && req.method === 'POST') graphqlRequestCounter.inc();
      next();
    });

    app.use(
      '/',
      graphqlHTTP((req: any) => ({
        schema,
        graphiql: process.env.NODE_ENV !== 'production',
        context: req.context,
      }))
    );

    app.listen(port, () => {
      logger.info(`Serveur GraphQL démarré sur http://localhost:${port}`);
      logger.info(`Prometheus metrics exposées sur http://localhost:${port}/metrics`);
    });
  })
  .catch((err) => {
    logger.error('Erreur critique de connexion', { err });
    process.exit(1);
  });
