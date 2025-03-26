import { GraphQLFieldResolver } from 'graphql';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Types pour l'authentification
interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// Fonction utilitaire pour générer un token JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Fonction utilitaire pour gérer les erreurs
const handleError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error('Une erreur inattendue est survenue');
};

// Resolver pour l'inscription
export const register: GraphQLFieldResolver<any, any> = async (_, args) => {
  try {
    const input = args.input as RegisterInput;
    const { username, email, password } = input;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Création du nouvel utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();

    // Génération du token JWT
    return generateToken(user.id);
  } catch (error: unknown) {
    handleError(error);
  }
};

// Resolver pour la connexion
export const login: GraphQLFieldResolver<any, any> = async (_, args) => {
  try {
    const input = args.input as LoginInput;
    const { email, password } = input;

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Génération du token JWT
    return generateToken(user.id);
  } catch (error: unknown) {
    handleError(error);
  }
};
