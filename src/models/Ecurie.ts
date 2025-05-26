import { Schema, model, Document } from 'mongoose';

export interface Ecurie extends Document {
  name: string;
  logoUrl?: string;
  color?: string;
  drivers: string[]; 
}

const EcurieSchema = new Schema<Ecurie>({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
  },
  color: {
    type: String,
  },
  drivers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
    },
  ],
});

export const EcurieModel = model<Ecurie>('Ecurie', EcurieSchema);