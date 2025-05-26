import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { userLeague } from './League';

export interface User extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  leagues: userLeague[];
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  leagues: [{ type: Schema.Types.ObjectId, ref: 'UserLeague' }],
  bets: [{ type: Schema.Types.ObjectId, ref: 'BetSelectionResult' }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  predictedPosition: {
    type: String,
  },
  predictedDNF: {
    type: String,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

// Hash le mot de passe avant de sauvegarder
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export const UserModel = model<User>('User', UserSchema);
