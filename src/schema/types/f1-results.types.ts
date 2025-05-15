import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } from 'graphql';

// Type pour un pilote
export const F1DriverType = new GraphQLObjectType({
  name: 'F1Driver',
  fields: {
    id: { type: GraphQLString },
    number: { type: GraphQLInt },
    name: { type: GraphQLString },
    team: { type: GraphQLString },
    nationality: { type: GraphQLString }
  }
});

// Type pour un résultat de course
export const RaceResultType = new GraphQLObjectType({
  name: 'RaceResult',
  fields: {
    position: { type: GraphQLInt },
    points: { type: GraphQLFloat },
    driver: { type: F1DriverType },
    laps: { type: GraphQLInt },
    time: { type: GraphQLString },
    status: { type: GraphQLString }
  }
});

// Type pour un Grand Prix
export const F1GrandPrixType = new GraphQLObjectType({
  name: 'F1GrandPrix',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    circuit: { type: GraphQLString },
    date: { type: GraphQLString },
    season: { type: GraphQLInt },
    round: { type: GraphQLInt },
    results: { type: new GraphQLList(RaceResultType) }
  }
});

// Type pour les stats d'un pilote
export const DriverStatsType = new GraphQLObjectType({
  name: 'DriverStats',
  fields: {
    wins: { type: GraphQLInt },
    podiums: { type: GraphQLInt },
    points: { type: GraphQLFloat },
    championships: { type: GraphQLInt },
    fastestLaps: { type: GraphQLInt },
    races: { type: GraphQLInt }
  }
});

// Type pour le classement
export const StandingEntryType = new GraphQLObjectType({
  name: 'StandingEntry',
  fields: {
    position: { type: GraphQLInt },
    points: { type: GraphQLFloat },
    wins: { type: GraphQLInt },
    name: { type: GraphQLString },
    id: { type: GraphQLString }
  }
});
