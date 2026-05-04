import { Schema, model, Document } from 'mongoose';

export interface IGp extends Document {
  gp_id: number;
  location: string;
  date_start: Date;
  date_end: Date;
  session_type: string;
  session_name: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  circuit_image?: string;
  gmt_offset: string;
  year: number;
}

const GpSchema = new Schema<IGp>(
  {
    gp_id: { type: Number, required: true },
    location: { type: String, required: true },
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    session_type: { type: String, required: true },
    session_name: { type: String, required: true },
    country_key: { type: Number, required: true },
    country_code: { type: String, required: true },
    country_name: { type: String, required: true },
    circuit_key: { type: Number, required: true },
    circuit_short_name: { type: String, required: true },
    circuit_image: { type: String, default: '' },
    gmt_offset: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { collection: 'gp' }
);

export default model<IGp>('Gp', GpSchema);
