import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';
import { UserType } from './user.types';
import { GpType } from './gp.type';

export const BetSelectionResultType = new GraphQLObjectType({
  name: 'BetSelectionResult',
  fields: {
    id: { type: GraphQLID },
    user: { type: UserType },
    gp: { type: GpType },
    pointsP10: { type: GraphQLInt },
  },
});
