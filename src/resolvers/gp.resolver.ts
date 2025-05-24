import GP from '../models/Gp';

export const gpResolvers = {
  Query: {
    getGPs: async () => {
      return await GP.find()
        .populate('track')
        .populate('drivers')
        .populate('classement');
    },
    getGPById: async (_: any, { id }: { id: string }) => {
      return await GP.findById(id)
        .populate('track')
        .populate('drivers')
        .populate('classement');
    }
  },
  // Mutation: à ajouter selon besoins (createGP, updateGP, deleteGP, etc.)
};
