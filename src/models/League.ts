import { Schema, model, Document } from 'mongoose';

export interface League extends Document {
  leagueType: string; 
  leagueName: string;  
  maxParticipants: number; 
  joinCode: string; 
}

const LeagueSchema = new Schema({
  leagueType: {
    type: String,
    required: true,
    enum: ['private', 'public'],
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
  }
});

export const LeagueModel = model<League>('League', LeagueSchema);