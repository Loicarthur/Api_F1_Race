import { LeagueModel } from '../models/League';
import { League } from '../models/League';

export const createLeague = async (leagueData: Partial<League>) => {
  const league = new LeagueModel(leagueData);
  return await league.save();
};

export const getLeagues = async () => {
  return await LeagueModel.find({});
};
