import mongoose, { Schema, Document } from 'mongoose';

export interface ITrack extends Document {
  trackName: string;
  countryName: string;
  pictureCountry: string;
  pictureTrack: string;
}

const TrackSchema: Schema = new Schema({
  trackName: { type: String, required: true },
  countryName: { type: String, required: true },
  pictureCountry: { type: String, required: true },
  pictureTrack: { type: String, required: true }
});

export default mongoose.model<ITrack>('Track', TrackSchema);
