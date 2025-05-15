import mongoose, { Schema, Document } from 'mongoose';

export interface ITracksBetSelectionResults extends Document {
  user: mongoose.Types.ObjectId;
  gp: mongoose.Types.ObjectId;
  selectedDrivers: {
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
  };
  actualResult?: {
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
  };
  score: number;
  createdAt: Date;
}

const TracksBetSelectionResultsSchema: Schema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  gp: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gp', 
    required: true 
  },
  selectedDrivers: {
    firstPlace: { 
      type: String, 
      required: true 
    },
    secondPlace: { 
      type: String, 
      required: true 
    },
    thirdPlace: { 
      type: String, 
      required: true 
    }
  },
  actualResult: {
    firstPlace: { 
      type: String 
    },
    secondPlace: { 
      type: String 
    },
    thirdPlace: { 
      type: String 
    }
  },
  score: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const TracksBetSelectionResults = mongoose.model<ITracksBetSelectionResults>('TracksBetSelectionResults', TracksBetSelectionResultsSchema);
