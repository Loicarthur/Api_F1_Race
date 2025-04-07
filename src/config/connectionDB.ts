import dotenv from 'dotenv';

// Chargement des variable d'envirenment à partir du fichier .env
dotenv.config();

export const port = process.env.PORT || 4002;
export const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';