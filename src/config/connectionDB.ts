import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    logger.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

export const port = process.env.PORT || 4002;
export const mongodbUri = process.env.MONGODB_URI!;
export const jwtSecret = process.env.JWT_SECRET!;
export const externalApiToken = process.env.EXTERNAL_API_TOKEN || '2025';
