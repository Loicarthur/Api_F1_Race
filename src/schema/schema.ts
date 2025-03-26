import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { register, login } from '../resolvers/auth.resolver';
import { getPastRaces, getUpcomingRaces, getNextRace } from '../resolvers/race';
import { RaceType, RaceResultType } from './types/race';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello from GraphQL';
      }
    },
    getPastRaces: {
      type: new GraphQLList(RaceResultType),
      resolve: getPastRaces
    },
    getUpcomingRaces: {
      type: new GraphQLList(RaceType),
      resolve: getUpcomingRaces
    },
    getNextRace: {
      type: RaceType,
      resolve: getNextRace
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    register: {
      type: GraphQLString,
      args: {
        input: {
          type: new GraphQLNonNull(new GraphQLObjectType({
            name: 'RegisterInput',
            fields: {
              username: { type: new GraphQLNonNull(GraphQLString) },
              email: { type: new GraphQLNonNull(GraphQLString) },
              password: { type: new GraphQLNonNull(GraphQLString) }
            }
          }))
        }
      },
      resolve: register
    },
    login: {
      type: GraphQLString,
      args: {
        input: {
          type: new GraphQLNonNull(new GraphQLObjectType({
            name: 'LoginInput',
            fields: {
              email: { type: new GraphQLNonNull(GraphQLString) },
              password: { type: new GraphQLNonNull(GraphQLString) }
            }
          }))
        }
      },
      resolve: login
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
