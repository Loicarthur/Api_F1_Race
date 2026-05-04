import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';
import { User, UserModel } from '../models/User';
import { jwtSecret } from '../config/connectionDB';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await UserModel.findById(decoded.userId);

    if (user) {
      (req as any).context = { req, res, user, token } as MyContext;
    }

    next();
  } catch {
    res.status(401).json({
      errors: [{ message: 'Session expirée ou invalide. Veuillez vous reconnecter.' }],
    });
  }
};

export const requireAuth = (context: MyContext | undefined): User => {
  if (!context?.user) {
    throw new Error('Authentication required. Please log in.');
  }
  return context.user;
};

export const requireAdmin = (context: MyContext | undefined): User => {
  const user = requireAuth(context);
  if (user.role !== 'admin') {
    throw new Error('Admin access required.');
  }
  return user;
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const context = (req as any).context as MyContext;

  if (!context?.user || context.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
    return;
  }

  next();
};
