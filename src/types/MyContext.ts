import { Request, Response } from 'express';
import { User } from '../models/User';

export interface MyContext {
  req: Request;
  res: Response;
  user?: User | null;
  token?: string;
}

export interface AuthenticatedContext extends MyContext {
  user: User;  // User est obligatoire dans un contexte authentifié
  token: string;
}
