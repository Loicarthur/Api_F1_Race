import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  driverId: string;
  code: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  team: string;
  lastUpdated: Date;
}

const DriverSchema: Schema = new Schema({
  driverId: { type: String, required: true, unique: true, index: true },
  code: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, index: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  team: { type: String, required: true, index: true },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<IDriver>('F1Driver', DriverSchema);
