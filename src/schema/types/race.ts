import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } from 'graphql';

const CompetitionType = new GraphQLObjectType({
  name: 'Competition',
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString }
  }
});

const CircuitType = new GraphQLObjectType({
  name: 'Circuit',
  fields: {
    name: { type: GraphQLString },
    image: { type: GraphQLString }
  }
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: {
    name: { type: GraphQLString },
    color: { type: GraphQLString }
  }
});

const DriverResultType = new GraphQLObjectType({
  name: 'DriverResult',
  fields: {
    driver_name: { type: GraphQLString },
    driver_trigram: { type: GraphQLString },
    driver_team: { type: TeamType },
    timer: { type: GraphQLString },
    position: { type: GraphQLString },
    points: { type: GraphQLInt }
  }
});

const RaceResultType = new GraphQLObjectType({
  name: 'RaceResult',
  fields: {
    id: { type: GraphQLID },
    competition: { type: CompetitionType },
    circuit: { type: CircuitType },
    date: { type: GraphQLString },
    result: { type: new GraphQLList(DriverResultType) }
  }
});

const RaceType = new GraphQLObjectType({
  name: 'Race',
  fields: {
    id: { type: GraphQLID },
    competition: { type: CompetitionType },
    circuit: { type: CircuitType },
    date: { type: GraphQLString }
  }
});

export { RaceType, RaceResultType };
