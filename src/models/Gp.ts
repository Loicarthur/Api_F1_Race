import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGP extends Document {
  name: string;
  round: number;
  track: Types.ObjectId;
  dateTime: string;
  drivers: Types.ObjectId[];
  classement?: Types.ObjectId[];
}

const GPSchema: Schema = new Schema({
  name: { type: String, required: true },
  round: { type: Number, required: true },
  track: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
  dateTime: { type: String, required: true },
  drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver', required: true }],
  classement: [{ type: Schema.Types.ObjectId, ref: 'GPClassement' }]
});

export default mongoose.model<IGP>('GP', GPSchema);
