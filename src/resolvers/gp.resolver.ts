import Gp from '../models/Gp';

export const gpResolvers = {
  Query: {
    gps: async () => {
      return await Gp.find();
    },
    lastGp: async () => {
      return await Gp.findOne().sort({ date_start: -1 });
    },
  },
};