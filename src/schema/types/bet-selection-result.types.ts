import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';
import { UserType } from './user.types';
import { GPType } from './f1.types';
import { F1DriverType as DriverType } from './f1-results.types';

export const BetSelectionResultType = new GraphQLObjectType({
  name: 'BetSelectionResult',
  fields: {
    id: { type: GraphQLID },
    user: { type: UserType },
    gp: { type: GPType },
    pointsP10: { type: GraphQLInt },
    driverP10: { type: DriverType }
  }
});
