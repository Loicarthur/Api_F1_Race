import { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLNonNull 
} from 'graphql';

// Type pour l'équipe
const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    name: { type: GraphQLString },
    color: { type: GraphQLString }
  })
});

// Type pour le circuit
const CircuitType = new GraphQLObjectType({
  name: 'Circuit',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) }
  })
});

// Type pour la compétition
const CompetitionType = new GraphQLObjectType({
  name: 'Competition',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) }
  })
});

// Type pour les résultats des pilotes
const DriverResultType = new GraphQLObjectType({
  name: 'DriverResult',
  fields: () => ({
    driver_name: { type: new GraphQLNonNull(GraphQLString) },
    driver_trigram: { type: new GraphQLNonNull(GraphQLString) },
    driver_team: { type: new GraphQLNonNull(TeamType) },
    timer: { type: GraphQLString },
    position: { type: new GraphQLNonNull(GraphQLString) },
    points: { type: new GraphQLNonNull(GraphQLInt) }
  })
});

// Type pour le P10
const P10Type = new GraphQLObjectType({
  name: 'P10',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    trigram: { type: new GraphQLNonNull(GraphQLString) },
    team: { type: new GraphQLNonNull(TeamType) }
  })
});

// Type principal pour une course
export const RaceType = new GraphQLObjectType({
  name: 'Race',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    competition: { type: new GraphQLNonNull(CompetitionType) },
    circuit: { type: new GraphQLNonNull(CircuitType) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLList(DriverResultType) },
    p10: { type: P10Type }
  })
});

// Type pour le résultat d'une course passée (inclut les résultats)
export const PastRaceType = new GraphQLObjectType({
  name: 'PastRace',
  fields: () => ({
    race: { type: new GraphQLNonNull(RaceType) }
  })
});

// Type pour une course à venir (sans résultats)
export const UpcomingRaceType = new GraphQLObjectType({
  name: 'UpcomingRace',
  fields: () => ({
    race: { type: new GraphQLNonNull(RaceType) }
  })
});
