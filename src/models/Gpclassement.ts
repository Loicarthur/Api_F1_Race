import { Schema, model, Document, Types } from 'mongoose';

export interface IGPClassement extends Document {
  race: Types.ObjectId;
  driver: Types.ObjectId;
  isDNF: boolean;
  position: number;
  time: string;
  points: number;
  score?: number;
  actualResult?: {
    position: number;
    points?: number;
    // Ajoute ici d'autres propriétés si besoin
  };
}

const GPClassementSchema = new Schema({
  race: { type: Schema.Types.ObjectId, ref: 'GP', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  isDNF: { type: Boolean, required: true },
  position: { type: Number, required: true },
  time: { type: String, required: true },
  points: { type: Number, required: true },
  score: { type: Number, default: 0 },
  actualResult: {
    position: { type: Number },
    points: { type: Number },
    // Ajoute ici d'autres propriétés si besoin
  }
});

export default model<IGPClassement>('GPClassement', GPClassementSchema);
