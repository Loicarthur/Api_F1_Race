import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema/schema';
import connectDB from './config/database';
import { syncService } from './services/sync.service';
import { port } from './config/connectionDB';

// Créer l'application Express
const app = express();

// Activer CORS
app.use(cors());

// Connexion à MongoDB
connectDB()
  .then(() => {
    syncService.initializeSync();

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