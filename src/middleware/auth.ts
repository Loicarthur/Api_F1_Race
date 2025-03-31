import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/MyContext';
import { UserModel } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication token missing');
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Récupérer l'utilisateur
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Ajouter l'utilisateur et le token au contexte
    (req as any).context = {
      req,
      res,
      user,
      token
    } as MyContext;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware pour vérifier le rôle admin
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const context = (req as any).context as MyContext;
  
  if (!context || !context.user || context.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
    return;
  }

  next();
};
