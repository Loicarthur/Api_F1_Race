import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { UserType } from './auth.types';
import { GPType } from './f1.types';

// Type pour le résultat
const ClassementResultType = new GraphQLObjectType({
  name: 'ClassementResult',
  fields: {
    position: { type: GraphQLInt },
    points: { type: GraphQLFloat }
  }
});

// Type pour le classement GP
export const GpClassementType = new GraphQLObjectType({
  name: 'GpClassement',
  fields: {
    id: { type: GraphQLString },
    gp: { type: GPType },
    user: { type: UserType },
    predictedDrivers: { type: new GraphQLList(GraphQLString) },
    actualResult: { type: ClassementResultType },
    score: { type: GraphQLFloat },
    createdAt: { type: GraphQLString }
  }
});

// Input pour créer un classement
export const CreateGpClassementInput = new GraphQLInputObjectType({
  name: 'CreateGpClassementInput',
  fields: {
    gpId: { type: new GraphQLNonNull(GraphQLString) },
    predictedDrivers: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  }
});

// Input pour mettre à jour le résultat
export const UpdateGpClassementResultInput = new GraphQLInputObjectType({
  name: 'UpdateGpClassementResultInput',
  fields: {
    classementId: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLInt) },
    points: { type: new GraphQLNonNull(GraphQLFloat) },
    score: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});
