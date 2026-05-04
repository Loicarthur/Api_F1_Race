import { Schema, model, Document, Types } from 'mongoose';

export interface Bet extends Document {
  userId: Types.ObjectId;
  gpId: Types.ObjectId;
  driverId: Types.ObjectId;
  leagueId?: Types.ObjectId;
  points: number;
}

const BetSchema = new Schema<Bet>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gpId: { type: Schema.Types.ObjectId, ref: 'GP', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  leagueId: { type: Schema.Types.ObjectId, ref: 'League' },
  points: { type: Number, default: 0 },
});

BetSchema.index({ userId: 1 });
BetSchema.index({ leagueId: 1 });
BetSchema.index({ userId: 1, gpId: 1 }, { unique: true });

export const BetModel = model<Bet>('Bet', BetSchema);
