import mongoose, { Schema, Document } from 'mongoose';
export interface IGp extends Document {
  competition: string;
  circuitId: number;
  date: Date;
  season: number;
  round: number;
  results?: mongoose.Types.ObjectId[];
}

const GpSchema: Schema = new Schema({
  competition: { 
    type: String, 
    required: true 
  },
  circuitId: { 
    type: Number,
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  season: { 
    type: Number, 
    required: true 
  },
  round: { 
    type: Number, 
    required: true 
  },
  results: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'GpClassement' 
  }]
});

export const Gp = mongoose.model<IGp>('Gp', GpSchema);
