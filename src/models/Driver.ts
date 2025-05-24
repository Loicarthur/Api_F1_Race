import { Schema, model, Document } from 'mongoose';
// import { Ecurie } from './Ecurie';

export interface IDriver extends Document {
  name: string;
  picture: string;
  trigram: string;
  // ecurie: Ecurie['_id']; // référence à l'écurie
}

const DriverSchema = new Schema<IDriver>({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  trigram: { type: String, required: true },
  // ecurie: { type: Schema.Types.ObjectId, ref: 'Ecurie', required: true },
});

export default model<IDriver>('Driver', DriverSchema);
