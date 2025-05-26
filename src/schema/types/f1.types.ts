import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat } from 'graphql';
import { GPClassementType } from './gp-classement.types';

// Types de base
export const AvatarType = new GraphQLObjectType({
  name: 'Avatar',
  fields: {
    id: { type: GraphQLID },
    pictureAvatarUrl: { type: GraphQLString }
  }
});

export const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: {
    id: { type: GraphQLID },
    idApiTrack: { type: GraphQLInt },
    countryName: { type: GraphQLString },
    trackName: { type: GraphQLString },
    pictureCountryUrl: { type: GraphQLString },
    pictureTrackUrl: { type: GraphQLString }
  }
});

// Déclaration préalable des types pour éviter les références circulaires
let DriverType: GraphQLObjectType;
let EcurieType: GraphQLObjectType;
let DriverEcurieType: GraphQLObjectType;

let GPDriverType: GraphQLObjectType;


// Initialisation des types avec leurs champs
DriverType = new GraphQLObjectType({
  name: 'Driver',
  fields: () => ({
    id: { type: GraphQLID },
    idApiDriver: { type: GraphQLInt },
    name: { type: GraphQLString },
    pictureUrl: { type: GraphQLString },
    nameAcronym: { type: GraphQLString },
    ecuries: { type: new GraphQLList(DriverEcurieType) }
  })
});

EcurieType = new GraphQLObjectType({
  name: 'Ecurie',
  fields: () => ({
    id: { type: GraphQLID },
    idApiEcurie: { type: GraphQLInt },
    name: { type: GraphQLString },
    logoUrl: { type: GraphQLString },
    color: { type: GraphQLString },
    drivers: { type: new GraphQLList(DriverEcurieType) }
  })
});

DriverEcurieType = new GraphQLObjectType({
  name: 'DriverEcurie',
  fields: () => ({
    id: { type: GraphQLID },
    driver: { type: DriverType },
    ecurie: { type: EcurieType },
    year: { type: GraphQLString }
  })
});

GPDriverType = new GraphQLObjectType({
  name: 'GPDriver',
  fields: () => ({
    id: { type: GraphQLID },
    gp: { type: GPType },
    driver: { type: DriverType },
    ecurie: { type: EcurieType }
  })
});



// Définition du type MainRaceResultType
export const MainRaceResultType = new GraphQLObjectType({
  name: 'MainRaceResult',
  fields: {
    position: { type: GraphQLInt },
    driverName: { type: GraphQLString },
    driverCode: { type: GraphQLString },
    team: { type: GraphQLString },
    time: { type: GraphQLString },
    points: { type: GraphQLInt }
  }
});

// Types pour les données en temps réel
export const CarDataType = new GraphQLObjectType({
  name: 'CarData',
  fields: {
    brake: { type: GraphQLInt },
    date: { type: GraphQLString },
    driver_number: { type: GraphQLInt },
    drs: { type: GraphQLInt },
    meeting_key: { type: GraphQLInt },
    n_gear: { type: GraphQLInt },
    rpm: { type: GraphQLInt },
    session_key: { type: GraphQLInt },
    speed: { type: GraphQLInt },
    throttle: { type: GraphQLInt }
  }
});

export const LapTimeType = new GraphQLObjectType({
  name: 'LapTime',
  fields: {
    driver_number: { type: GraphQLInt },
    lap_number: { type: GraphQLInt },
    lap_time: { type: GraphQLFloat },
    sector_1: { type: GraphQLFloat },
    sector_2: { type: GraphQLFloat },
    sector_3: { type: GraphQLFloat },
    session_key: { type: GraphQLInt },
    date: { type: GraphQLString }
  }
});

export const TrackStatusType = new GraphQLObjectType({
  name: 'TrackStatus',
  fields: {
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    session_key: { type: GraphQLInt },
    date: { type: GraphQLString }
  }
});

// Définition du type GP (Grand Prix)
export const GPType: GraphQLObjectType = new GraphQLObjectType({
  name: 'GP',
  fields: (): import('graphql').GraphQLFieldConfigMap<any, any> => ({
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

// Export des types
export { DriverType, EcurieType, DriverEcurieType, GPDriverType };
// GPType est déjà exporté explicitement plus haut
