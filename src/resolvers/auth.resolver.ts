import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { GraphQLFieldResolver } from 'graphql';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const register: GraphQLFieldResolver<any, any> = async (_, args) => {
  try {
    const { username, email, password } = args.input;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export const login: GraphQLFieldResolver<any, any> = async (_, args) => {
  try {
    const { email, password } = args.input;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    return token;
  } catch (error) {
    throw error;
  }
};
