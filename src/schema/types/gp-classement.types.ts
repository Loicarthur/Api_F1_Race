import { GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import { GPType } from './f1.types';
import { F1DriverType as DriverType } from './f1-results.types';

export const GPClassementType = new GraphQLObjectType({
  name: 'GPClassement',
  fields: {
    id: { type: GraphQLID },
    race: { type: GPType },
    driver: { type: DriverType },
    isDNF: { type: GraphQLBoolean },
    position: { type: GraphQLInt },
    time: { type: GraphQLString },
    points: { type: GraphQLInt }
  }
});
