import { GraphQLFieldResolver } from 'graphql';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';
import { jwtSecret } from '../config/connectionDB';
import { requireAdmin } from '../middleware/auth';
import { checkRateLimit } from '../utils/rateLimiter';
import { logger } from '../utils/logger';

const JWT_EXPIRES_IN = '24h';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: JWT_EXPIRES_IN });
};

const getClientIp = (context: MyContext): string =>
  context?.req?.ip ?? context?.req?.socket?.remoteAddress ?? 'unknown';

export const register: GraphQLFieldResolver<unknown, MyContext> = async (_, args, context) => {
  try {
    checkRateLimit(`register:${getClientIp(context)}`, 3, 60 * 60 * 1000);

    const { username, email, password } = args.input;

    if (!EMAIL_REGEX.test(String(email))) {
      return {
        token: null,
        user: null,
        error: { message: 'Invalid email format', code: 'INVALID_INPUT', httpStatus: 400 },
      };
    }

    if (String(password).length < 8) {
      return {
        token: null,
        user: null,
        error: {
          message: 'Password must be at least 8 characters',
          code: 'INVALID_INPUT',
          httpStatus: 400,
        },
      };
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email: String(email) }, { username: String(username) }],
    });
    if (existingUser) {
      return {
        token: null,
        user: null,
        error: { message: 'User already exists', code: 'USER_ALREADY_EXISTS', httpStatus: 400 },
      };
    }

    const user = await UserModel.create({
      username: String(username),
      email: String(email),
      password,
    });
    const token = generateToken(user.id);
    logger.info('User registered', { userId: user.id, username: user.username });

    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
      error: null,
      httpStatus: 201,
    };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Too many')) {
      return {
        token: null,
        user: null,
        error: { message: error.message, code: 'RATE_LIMITED', httpStatus: 429 },
      };
    }
    logger.error('Register error', { error });
    return {
      token: null,
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: 500,
      },
    };
  }
};

export const login: GraphQLFieldResolver<unknown, MyContext> = async (_, args, context) => {
  try {
    checkRateLimit(`login:${getClientIp(context)}`, 5, 15 * 60 * 1000);

    const { email, password } = args.input;

    if (!EMAIL_REGEX.test(String(email))) {
      return {
        token: null,
        user: null,
        error: { message: 'Invalid email format', code: 'INVALID_INPUT', httpStatus: 400 },
      };
    }

    const user = await UserModel.findOne({ email: String(email) });
    if (!user) {
      return {
        token: null,
        user: null,
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS', httpStatus: 401 },
      };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      logger.warn('Failed login attempt', { email: String(email), ip: getClientIp(context) });
      return {
        token: null,
        user: null,
        error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS', httpStatus: 401 },
      };
    }

    const token = generateToken(user.id);
    logger.info('User logged in', { userId: user.id });

    return {
      token,
      user: { id: user.id, username: user.username, email: user.email },
      error: null,
      httpStatus: 200,
    };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Too many')) {
      return {
        token: null,
        user: null,
        error: { message: error.message, code: 'RATE_LIMITED', httpStatus: 429 },
      };
    }
    logger.error('Login error', { error });
    return {
      token: null,
      user: null,
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        httpStatus: 500,
      },
    };
  }
};

export const getAllUsers: GraphQLFieldResolver<unknown, MyContext> = async (_, __, context) => {
  requireAdmin(context);
  const users = await UserModel.find({}, '-password');
  return users.map((user) => ({ id: user.id, username: user.username, email: user.email }));
};

export const currentUser: GraphQLFieldResolver<unknown, MyContext> = async (_, __, context) => {
  if (!context?.user) throw new Error('Not authenticated');
  return context.user;
};
