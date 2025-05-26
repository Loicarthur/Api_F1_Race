import { Schema, model, Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  picture: string;
  trigram: string;
}

const DriverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  trigram: { type: String, required: true },
});

export default model<IDriver>('Driver', DriverSchema);
