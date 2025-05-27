import { Schema, model, Document } from 'mongoose';

export interface IGP extends Document {
  position: string;
  driver: string;
  team: string;
  number: string;
  scraped_at: Date;
}

const GPSchema = new Schema<IGP>({
  position: { type: String, required: true }, // Position du pilote
  driver: { type: String, required: true },   // Nom du pilote
  team: { type: String, required: true },     // Nom de l'équipe
  number: { type: String, required: true },   // Numéro du pilote
  scraped_at: { type: Date, required: true }, // Date de récupération des 
});

export default model<IGP>('GP', GPSchema);