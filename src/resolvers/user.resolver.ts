import { UserModel } from '../models/User';

export const userResolvers = {
  Query: {
    getUsers: async () => {
      return await UserModel.find().populate('leagues').populate('bets');
    },
    getUserById: async (_: any, { id }: { id: string }) => {
      return await UserModel.findById(id).populate('leagues').populate('bets');
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { email, username, password }: { email: string; username: string; password: string }
    ) => {
      const user = new UserModel({ email, username, password });
      return await user.save();
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await UserModel.findByIdAndDelete(id);
      return { id };
    },
  },
};
