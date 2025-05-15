import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UserType } from './auth.types';
import { GPType } from './f1.types';

// Type pour les pilotes sélectionnés/résultat
const DriversSelectionType = new GraphQLObjectType({
  name: 'DriversSelection',
  fields: {
    firstPlace: { type: GraphQLString },
    secondPlace: { type: GraphQLString },
    thirdPlace: { type: GraphQLString }
  }
});

// Type pour le pari
export const TracksBetType = new GraphQLObjectType({
  name: 'TracksBet',
  fields: {
    id: { type: GraphQLString },
    user: { type: UserType },
    gp: { type: GPType },
    selectedDrivers: { type: DriversSelectionType },
    actualResult: { type: DriversSelectionType },
    score: { type: GraphQLFloat },
    createdAt: { type: GraphQLString }
  }
});

// Input pour créer un pari
export const CreateBetInput = new GraphQLInputObjectType({
  name: 'CreateBetInput',
  fields: {
    gpId: { type: new GraphQLNonNull(GraphQLString) },
    firstPlace: { type: new GraphQLNonNull(GraphQLString) },
    secondPlace: { type: new GraphQLNonNull(GraphQLString) },
    thirdPlace: { type: new GraphQLNonNull(GraphQLString) }
  }
});

// Input pour mettre à jour le résultat
export const UpdateBetResultInput = new GraphQLInputObjectType({
  name: 'UpdateBetResultInput',
  fields: {
    betId: { type: new GraphQLNonNull(GraphQLString) },
    firstPlace: { type: new GraphQLNonNull(GraphQLString) },
    secondPlace: { type: new GraphQLNonNull(GraphQLString) },
    thirdPlace: { type: new GraphQLNonNull(GraphQLString) }
  }
});
