import { GraphQLFieldResolver } from 'graphql';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
export const register: GraphQLFieldResolver<any, MyContext> = async (_, { input }) => {
  try {
    const { username, email, password } = input as RegisterInput;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer un nouvel utilisateur
    const user = new UserModel({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Générer le token JWT
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    handleError(error);
  }
};

// Resolver pour la connexion
export const login: GraphQLFieldResolver<any, MyContext> = async (_, { input }) => {
  try {
    const { email, password } = input as LoginInput;

    // Trouver l'utilisateur
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Générer le token JWT
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    handleError(error);
  }
};
