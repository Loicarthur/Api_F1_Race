import { MyContext } from '../types/MyContext';
import { BetModel } from '../models/Bet';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { logger } from '../utils/logger';

const POINTS_SYSTEM: { [position: string]: number } = {
  P1: 25,
  P2: 18,
  P3: 15,
  P4: 12,
  P5: 10,
  P6: 8,
  P7: 6,
  P8: 4,
  P9: 2,
  P10: 1,
  P11: 0,
  P12: 0,
  P13: 0,
  P14: 0,
  P15: 0,
  P16: 0,
  P17: 0,
  P18: 0,
  P19: 0,
  P20: 0,
};

export const createBet = async (
  _: unknown,
  args: { [argName: string]: any },
  context: MyContext
) => {
  const user = requireAuth(context);
  try {
    const { input } = args;
    const newBet = new BetModel({
      userId: user.id,
      gpId: input.gpId,
      driverId: input.driverId,
      leagueId: input.leagueId,
      points: 0,
    });
    await newBet.save();
    return newBet;
  } catch (error) {
    logger.error('Error in createBet', { error });
    throw new Error('Failed to create bet');
  }
};

export const getBetById = async (_: unknown, { id }: { id: string }, context: MyContext) => {
  requireAuth(context);
  try {
    const bet = await BetModel.findById(id).populate('userId gpId driverId leagueId');
    if (!bet) throw new Error('Bet not found');
    return bet;
  } catch (error) {
    logger.error('Error in getBetById', { error });
    throw new Error('Failed to fetch bet');
  }
};

export const assignPointsToBet = async (
  _: unknown,
  { betId, position }: { betId: string; position: string },
  context: MyContext
) => {
  requireAdmin(context);
  try {
    const points = POINTS_SYSTEM[position] ?? 0;
    const updatedBet = await BetModel.findByIdAndUpdate(betId, { $set: { points } }, { new: true });
    if (!updatedBet) throw new Error('Bet not found');
    return updatedBet;
  } catch (error) {
    logger.error('Error in assignPointsToBet', { error });
    throw new Error('Failed to assign points to bet');
  }
};

export const updateBet = async (
  _: unknown,
  { id, input }: { id: string; input: { driverId?: string; points?: number } },
  context: MyContext
) => {
  const user = requireAuth(context);
  try {
    const bet = await BetModel.findById(id);
    if (!bet) throw new Error('Bet not found');
    if (bet.userId.toString() !== user.id) throw new Error('Not authorized to update this bet');

    const updatedBet = await BetModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    );
    return updatedBet;
  } catch (error) {
    logger.error('Error in updateBet', { error });
    throw new Error('Failed to update bet');
  }
};
