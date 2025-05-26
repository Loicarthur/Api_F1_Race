import { Schema, model, Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  picture: string;
  trigram: string;
  ecurie: Schema.Types.ObjectId; // Référence à une écurie
}

const DriverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  trigram: { type: String, required: true },
  ecurie: { type: Schema.Types.ObjectId, ref: 'Ecurie', required: true }, // Référence à l'écurie
});

export default model<IDriver>('Driver', DriverSchema);