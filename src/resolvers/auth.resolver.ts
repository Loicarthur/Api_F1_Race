import { GraphQLFieldResolver } from 'graphql';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';

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
export const register: GraphQLFieldResolver<unknown, MyContext> = async (_, args) => {
  try {
    const { username, email, password } = args.input as RegisterInput;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Créer un nouvel utilisateur (le middleware pre-save va hasher le mot de passe)
    const user = await UserModel.create({
      username,
      email,
      password // Le mot de passe sera hashé automatiquement par le middleware
    });

    // Générer le token JWT
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    return handleError(error);
  }
};

// Resolver pour la connexion
export const login: GraphQLFieldResolver<unknown, MyContext> = async (_, args) => {
  try {
    const { email, password } = args.input as LoginInput;

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier le mot de passe en utilisant la méthode du modèle
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Générer le token JWT
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    return handleError(error);
  }
};

// Resolver pour obtenir tous les utilisateurs
export const getAllUsers: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const users = await UserModel.find({}, '-password'); // Exclure le mot de passe
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email
    }));
  } catch (error) {
    return handleError(error);
  }
};
