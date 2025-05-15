import mongoose, { Schema, Document } from 'mongoose';

export interface IUserLeague extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  gps: mongoose.Types.ObjectId[];
  isPrivate: boolean;
  inviteCode?: string;
  createdAt: Date;
}

const UserLeagueSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  gps: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gp' 
  }],
  isPrivate: { 
    type: Boolean, 
    default: false 
  },
  inviteCode: { 
    type: String, 
    unique: true,
    sparse: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const UserLeague = mongoose.model<IUserLeague>('UserLeague', UserLeagueSchema);
