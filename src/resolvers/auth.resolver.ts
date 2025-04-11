import { GraphQLFieldResolver } from 'graphql';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// Fonction utilitaire pour générer un token JWT
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Resolver pour l'inscription
export const register: GraphQLFieldResolver<unknown, MyContext> = async (_, args) => {
  try {
    const { username, email, password } = args.input;

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return {
        token: null,
        user: null,
        error: {
          message: 'User already exists',
          code: 'USER_ALREADY_EXISTS',
          httpStatus: '400' 
        }
      };
    }

    const user = await UserModel.create({ username, email, password });
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      error: null
    };
  } catch (error) {
    return {
      token: null,
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: '500'
      }
    };
  }
};

// Resolver pour la connexion
export const login: GraphQLFieldResolver<unknown, MyContext> = async (_, args) => {
  try {
    const { email, password } = args.input;
    
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        token: null,
        user: null,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
          httpStatus: '404'
        }
      };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return {
        token: null,
        user: null,
        error: {
          message: 'Invalid password',
          code: 'INVALID_CREDENTIALS',
          httpStatus: '401'
        }
      };
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      error: null
    };
  } catch (error) {
    return {
      token: null,
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: '500'
      }
    };
  }
};

// Resolver pour obtenir tous les utilisateurs
export const getAllUsers: GraphQLFieldResolver<unknown, MyContext> = async () => {
  try {
    const users = await UserModel.find({}, '-password');
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email
    }));
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: '500'
      }
    };
  }
};