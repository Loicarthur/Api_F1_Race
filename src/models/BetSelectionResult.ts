import { Schema, model, Document, Types } from 'mongoose';

export interface IBetSelectionResult extends Document {
  user: Types.ObjectId;
  gp: Types.ObjectId;
  pointsP10?: number;
  driverP10: Types.ObjectId;
}

const BetSelectionResultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gp: { type: Schema.Types.ObjectId, ref: 'GP', required: true },
  pointsP10: { type: Number },
  driverP10: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
});

export default model<IBetSelectionResult>('BetSelectionResult', BetSelectionResultSchema);
