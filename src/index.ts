import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import schema from './schema/schema';
import connectDB from './config/database';
import { syncService } from './services/sync.service';

// Charger les variables d'environnement
dotenv.config();
console.log(' Démarrage du serveur...');

// Créer l'application Express
const app = express();

// Activer CORS
app.use(cors());
console.log(' CORS activé');

// Connexion à MongoDB
console.log('Tentative de connexion à MongoDB...');
connectDB()
  .then(() => {
    console.log('MongoDB connecté avec succès!');
    
    // Initialisation du service de synchronisation
    syncService.initializeSync();
    console.log('Service de synchronisation initialisé');

    // Configuration de l'endpoint GraphQL
    app.use('/', graphqlHTTP({
      schema,
      graphiql: true,
    }));
    console.log('Endpoint GraphQL configuré');

    // Démarrer le serveur
    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => {
      console.log(`
==================================
🚀 Serveur GraphQL démarré avec succès!
📝 GraphiQL disponible sur: http://localhost:${PORT}
==================================
      `);
    });
  })
  .catch((err: Error) => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });
