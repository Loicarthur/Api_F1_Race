import { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLNonNull, 
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql';
import { register, login } from '../resolvers/auth.resolver';
import { RaceType, PastRaceType, UpcomingRaceType } from './types/race';
import { F1Resolver } from '../resolvers/f1.resolver';

const f1Resolver = new F1Resolver();

// Types d'entrée pour l'authentification
const RegisterInputType = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getPastRaces: {
      type: new GraphQLList(PastRaceType),
      resolve: f1Resolver.getPastRaces
    },
    getUpcomingRaces: {
      type: new GraphQLList(UpcomingRaceType),
      resolve: f1Resolver.getUpcomingRaces
    },
    getNextRace: {
      type: RaceType,
      resolve: f1Resolver.getNextRace
    }
  })
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    register: {
      type: GraphQLString,
      args: {
        input: { type: new GraphQLNonNull(RegisterInputType) }
      },
      resolve: register
    },
    login: {
      type: GraphQLString,
      args: {
        input: { type: new GraphQLNonNull(LoginInputType) }
      },
      resolve: login
    }
  })
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
