import { Schema, model, Document } from 'mongoose';

export interface Bet extends Document {
  userId: string;
  gpId: string;
  driverId: string;
  points: number; 
}

const BetSchema = new Schema<Bet>({
  userId: { type: Schema.Types.String, ref: 'User', required: true },
  gpId: { type: Schema.Types.String, ref: 'GP', required: true },
  driverId: { type: Schema.Types.String, ref: 'Driver', required: true },
  points: { type: Number, default: 0 },
});

export const BetModel = model<Bet>('Bet', BetSchema);