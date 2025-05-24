import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } from 'graphql';

// Type pour le circuit
const CircuitType = new GraphQLObjectType({
  name: 'Circuit',
  fields: {
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    country: { type: GraphQLString }
  }
});

// Type pour le pilote
const RaceHistoryDriverType = new GraphQLObjectType({
  name: 'RaceHistoryDriver',
  fields: {
    name: { type: GraphQLString },
    number: { type: GraphQLInt },
    image: { type: GraphQLString }
  }
});

// Type pour l'équipe
const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: {
    name: { type: GraphQLString },
    logo: { type: GraphQLString }
  }
});

// Type pour les résultats d'un pilote dans une course
const RaceHistoryResultType = new GraphQLObjectType({
  name: 'RaceHistoryResult',
  fields: {
    position: { type: GraphQLInt },
    driver: { type: RaceHistoryDriverType },
    team: { type: TeamType },
    time: { type: GraphQLString },
    laps: { type: GraphQLInt },
    grid: { type: GraphQLInt },
    points: { type: GraphQLFloat },
    fastest_lap: { type: GraphQLString }
  }
});

// Type pour une course complète avec ses résultats
export const RaceHistoryType = new GraphQLObjectType({
  name: 'RaceHistory',
  fields: {
    id: { type: GraphQLInt },
    competition: { type: GraphQLString },
    circuit: { type: CircuitType },
    season: { type: GraphQLInt },
    type: { type: GraphQLString },
    date: { type: GraphQLString },
    timezone: { type: GraphQLString },
    results: { type: new GraphQLList(RaceHistoryResultType) }
  }
});
