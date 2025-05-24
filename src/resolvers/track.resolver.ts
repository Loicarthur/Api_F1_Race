import Track from '../models/Track';

export const trackResolvers = {
  Query: {
    getTracks: async () => {
      return await Track.find();
    },
    getTrackById: async (_: any, { id }: { id: string }) => {
      return await Track.findById(id);
    }
  },
  Mutation: {
    createTrack: async (_: any, { input }: any) => {
      const newTrack = new Track(input);
      return await newTrack.save();
    },
    updateTrack: async (_: any, { id, input }: any) => {
      return await Track.findByIdAndUpdate(id, input, { new: true });
    },
    deleteTrack: async (_: any, { id }: { id: string }) => {
      await Track.findByIdAndDelete(id);
      return { id };
    }
  }
};
