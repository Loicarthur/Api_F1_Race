import { EcurieModel } from '../models/Ecurie';

export const getEcuries = async () => {
    try {
      const ecuries = await EcurieModel.find().populate('drivers'); // Populate pour inclure les pilotes
      return ecuries; // Retourne uniquement les données
    } catch (error) {
      throw new Error('Failed to fetch ecuries'); // Gère les erreurs
    }
  };

  export const getEcurieById = async (_: unknown, { id }: { id: string }) => {
    try {
      const ecurie = await EcurieModel.findById(id).populate('drivers'); // Populate pour inclure les pilotes
      if (!ecurie) {
        throw new Error('Ecurie not found'); // Gère les erreurs
      }
      return ecurie; // Retourne uniquement les données
    } catch (error) {
      throw new Error('Failed to fetch ecurie'); // Gère les erreurs
    }
  };

  export const createEcurie = async (
    _: unknown,
    args: { [argName: string]: any } // Utilisez un type générique pour les arguments
  ) => {
    try {
      const { input } = args; // Extraire l'input des arguments
      const newEcurie = new EcurieModel({
        name: input.name,
        logoUrl: input.logoUrl,
        color: input.color,
        drivers: input.drivers || [],
      });
  
      await newEcurie.save();
      return newEcurie; // Retourne uniquement les données
    } catch (error) {
      console.error("Error in createEcurie:", error); // Log de l'erreur
      throw new Error('Failed to create ecurie'); // Gère les erreurs
    }
  };