import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import dotenv from 'dotenv';
import schema from './schema/schema';
import connectDB from './config/database';
import { syncService } from './services/sync.service';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB()
  .then(() => {
    // Initialisation du service de synchronisation
    syncService.initializeSync();

    // GraphQL endpoint
    app.use('/graphql', createHandler({ schema }));

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err: Error) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
