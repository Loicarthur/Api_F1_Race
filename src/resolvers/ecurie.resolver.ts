import { EcurieModel } from '../models/Ecurie';

export const getEcuries = async () => {
    try {
      const ecuries = await EcurieModel.find().populate('drivers');
      return ecuries;
    } catch (error) {
      throw new Error('Failed to fetch ecuries'); 
    }
  };

  export const getEcurieById = async (_: unknown, { id }: { id: string }) => {
    try {
      const ecurie = await EcurieModel.findById(id).populate('drivers');
      if (!ecurie) {
        throw new Error('Ecurie not found');
      }
      return ecurie; 
    } catch (error) {
      throw new Error('Failed to fetch ecurie'); 
    }
  };