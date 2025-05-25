import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { TrackType } from './track.types';
import { DriverType } from './driver.types'; // Only import, never export or redefine
import { GPClassementType } from './gp-classement.types';
import { MainRaceResultType } from './f1.types'; // ou dans son propre fichier si séparé

export const GPType = new GraphQLObjectType({
  name: 'GP',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    round: { type: GraphQLInt },
    track: { type: TrackType },
    dateTime: { type: GraphQLString },
    drivers: { type: new GraphQLList(DriverType) },
    classement: { type: new GraphQLList(GPClassementType) },
    mainRaceResults: { type: new GraphQLList(MainRaceResultType) }, // optionnel selon ton modèle
    sessionType: { type: GraphQLString }, // optionnel
    flag: { type: GraphQLString }         // optionnel
  })
});
