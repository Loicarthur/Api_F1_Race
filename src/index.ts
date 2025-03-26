import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import schema from './schema/schema';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/f1_api';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// GraphQL endpoint
app.use('/graphql', createHandler({ schema }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
