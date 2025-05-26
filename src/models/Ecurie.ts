import { Schema, model, Document } from 'mongoose';

export interface IEcurie extends Document {
  name: string;
  logoUrl?: string;
  color?: string;
  drivers: Schema.Types.ObjectId[]; // Liste des références aux pilotes
}

const EcurieSchema = new Schema<IEcurie>({
  name: { type: String, required: true },
  logoUrl: { type: String },
  color: { type: String },
  drivers: [{ type: Schema.Types.ObjectId, ref: 'Driver' }], // Références aux pilotes
});

export const EcurieModel = model<IEcurie>('Ecurie', EcurieSchema);