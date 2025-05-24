import BetSelectionResult from '../models/BetSelectionResult';

export const betSelectionResultResolvers = {
  Query: {
    getBetSelectionResults: async () => {
      return await BetSelectionResult.find()
        .populate('user')
        .populate('gp')
        .populate('driverP10');
    },
    getBetSelectionResultById: async (_: any, { id }: { id: string }) => {
      return await BetSelectionResult.findById(id)
        .populate('user')
        .populate('gp')
        .populate('driverP10');
    }
  },
  Mutation: {
    createBetSelectionResult: async (_: any, { user, gp, pointsP10, piloteP10 }: any) => {
      const bet = new BetSelectionResult({ user, gp, pointsP10, driverP10: piloteP10 });
      return await bet.save();
    },
    deleteBetSelectionResult: async (_: any, { id }: { id: string }) => {
      await BetSelectionResult.findByIdAndDelete(id);
      return { id };
    }
  }
};
