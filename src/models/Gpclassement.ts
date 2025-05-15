import mongoose, { Schema, Document } from 'mongoose';

export interface IGpClassement extends Document {
  gp: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  predictedDrivers: string[];
  actualResult?: {
    position: number;
    points: number;
  };
  score: number;
  createdAt: Date;
}

const GpClassementSchema: Schema = new Schema({
  gp: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gp', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  predictedDrivers: [{ 
    type: String, 
    required: true 
  }],
  actualResult: {
    position: { 
      type: Number 
    },
    points: { 
      type: Number 
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

export const GpClassement = mongoose.model<IGpClassement>('GpClassement', GpClassementSchema);
