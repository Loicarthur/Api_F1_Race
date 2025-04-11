import { Schema, model, Document } from 'mongoose';
import { User } from './User';

//Relation entre ligue et utilisateur
export interface userLeague {
  id: string;
  league: League;
  user: User;
  admin: boolean; 
}

export interface League extends Document {
  isPrivate: boolean; 
  leagueName: string;
  maxParticipants: number;
  joinCode: string;
  users: userLeague[];
}

const LeagueSchema = new Schema<League>({
  isPrivate: {
    type: Boolean,
    required: true,
    default: true, 
  },
  leagueName: {
    type: String,
    required: true,
    unique: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1,
  },
  joinCode: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{
    id: {
      type: String,
      required: true,
    },
    league: {
      type: Schema.Types.ObjectId,
      ref: 'League', 
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false, 
    },
  }],
});

export const LeagueModel = model<League>('League', LeagueSchema);