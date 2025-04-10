import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { register, login, getAllUsers } from '../resolvers/auth.resolver';
import { F1Resolver } from '../resolvers/f1.resolver';
import { F1HistoryResolver } from '../resolvers/f1-history.resolver';
import { CarDataType, LapTimeType, TrackStatusType } from './types/f1.types';
import { RaceHistoryType } from './types/race-history';
import { AuthResponseType, UserType } from './types/auth.types';
import { MyContext } from '../types/MyContext';
import { leagueResolvers} from '../resolvers/leaugue.resolver';
import {LeagueResponseType } from './types/league.types'; 
const f1Resolver = new F1Resolver();
const f1HistoryResolver = new F1HistoryResolver();

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

const LeagueInputType = new GraphQLInputObjectType({
  name: 'LeagueInput',
  fields: () => ({
    leagueType: { type: new GraphQLNonNull(GraphQLString) },
    leagueName: { type: new GraphQLNonNull(GraphQLString) },
    maxParticipants: { type: new GraphQLNonNull(GraphQLInt) },
  })});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // Liste des utilisateurs
    users: {
      type: new GraphQLList(UserType),
      resolve: getAllUsers
    },
    
    // Données historiques (api-sports.io)
    getPastRaces: {
      type: new GraphQLList(RaceHistoryType),
      args: {
        season: { type: GraphQLInt }
      },
      resolve: f1HistoryResolver.getPastRaceResults
    },
    getRaceDetails: {
      type: RaceHistoryType,
      args: {
        raceId: { type: GraphQLInt }
      },
      resolve: f1HistoryResolver.getRaceDetails
    },

    // Données en temps réel (OpenF1)
    carData: {
      type: new GraphQLList(CarDataType),
      args: {
        session_key: { type: GraphQLInt },
        driver_number: { type: GraphQLInt }
      },
      resolve: f1Resolver.getCarData
    },
    lapTimes: {
      type: new GraphQLList(LapTimeType),
      args: {
        session_key: { type: GraphQLInt },
        driver_number: { type: GraphQLInt }
      },
      resolve: f1Resolver.getLapTimes
    },
    trackStatus: {
      type: TrackStatusType,
      args: {
        session_key: { type: GraphQLInt }
      },
      resolve: f1Resolver.getTrackStatus
    },
    sessions: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'Session',
        fields: {
          session_key: { type: GraphQLInt },
          meeting_key: { type: GraphQLInt },
          session_name: { type: GraphQLString },
          session_type: { type: GraphQLString },
          session_date: { type: GraphQLString }
        }
      })),
      args: {
        year: { type: GraphQLInt },
        round: { type: GraphQLInt },
        session_type: { type: GraphQLString }
      },
      resolve: f1Resolver.getSessions
    },
    sessionDetails: {
      type: new GraphQLObjectType({
        name: 'SessionDetails',
        fields: {
          drivers: { type: new GraphQLList(new GraphQLObjectType({
            name: 'Driver',
            fields: {
              driver_number: { type: GraphQLInt },
              name: { type: GraphQLString },
              team: { type: GraphQLString }
            }
          }))},
          lapTimes: { type: new GraphQLList(LapTimeType) },
          trackStatus: { type: TrackStatusType },
          carData: { type: new GraphQLList(CarDataType) }
        }
      }),
      args: {
        session_key: { type: GraphQLInt }
      },
      resolve: f1Resolver.getSessionDetails
    }
  })
});

const RootMutation = new GraphQLObjectType<unknown, MyContext>({
  name: 'RootMutation',
  fields: () => ({
    register: {
      type: AuthResponseType,
      args: {
        input: { type: new GraphQLNonNull(RegisterInputType) }
      },
      resolve: register,
    },
    login: {
      type: AuthResponseType,
      args: {
        input: { type: new GraphQLNonNull(LoginInputType) }
      },
      resolve: login,
    },
    createLeague: {
      type: LeagueResponseType,
      args: {
        input: { type: new GraphQLNonNull(LeagueInputType) },
      },
      resolve: leagueResolvers.Mutation.createLeague,
    },
  }),
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
