import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

export const RegisterInputType = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const LeagueInputType = new GraphQLInputObjectType({
  name: 'LeagueInput',
  fields: () => ({
    isPrivate: { type: new GraphQLNonNull(GraphQLBoolean) },
    leagueName: { type: new GraphQLNonNull(GraphQLString) },
    maxParticipants: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const ModifyLeagueInputType = new GraphQLInputObjectType({
  name: 'ModifyLeagueInput',
  fields: () => ({
    isPrivate: { type: GraphQLBoolean },
    leagueName: { type: GraphQLString },
    maxParticipants: { type: GraphQLInt },
  }),
});

export const AddUserToLeagueInputType = new GraphQLInputObjectType({
  name: 'AddUserToLeagueInput',
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    admin: { type: GraphQLBoolean },
  }),
});

export const GetLeaguesByUserIdInputType = new GraphQLInputObjectType({
  name: 'GetLeaguesByUserIdInput',
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const GetLeagueByJoinCodeInputType = new GraphQLInputObjectType({
  name: 'GetLeagueByJoinCodeInput',
  fields: () => ({
    joinCode: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const DeleteLeagueInputType = new GraphQLInputObjectType({
  name: 'DeleteLeagueInput',
  fields: () => ({
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const CreateEcurieInputType = new GraphQLInputObjectType({
  name: 'CreateEcurieInput',
  fields: {
    name: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    color: { type: GraphQLString },
    drivers: { type: new GraphQLList(GraphQLString) },
  },
});

export const CreateBetInputType = new GraphQLInputObjectType({
  name: 'CreateBetInput',
  fields: {
    gpId: { type: new GraphQLNonNull(GraphQLString) },
    driverId: { type: new GraphQLNonNull(GraphQLString) },
    leagueId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const UpdateBetInputType = new GraphQLInputObjectType({
  name: 'UpdateBetInput',
  fields: {
    gpId: { type: GraphQLString },
    driverId: { type: GraphQLString },
    leagueId: { type: GraphQLString },
    points: { type: GraphQLInt },
  },
});
