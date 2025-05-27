import Gp from '../models/Gp';

export const gpResolvers = {
  Query: {
    gps: async () => {
      return await Gp.find(); // Récupère tous les GP
    },
    lastGp: async () => {
      return await Gp.findOne().sort({ date_start: -1 }); // Trie par `date_start` décroissant et retourne le dernier GP
    },
  },
};