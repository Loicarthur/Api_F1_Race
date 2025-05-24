import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat } from 'graphql';

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
let GPType: GraphQLObjectType;
let GPDriverType: GraphQLObjectType;


// Initialisation des types avec leurs champs
DriverType = new GraphQLObjectType({
  name: 'Pilote',
  fields: () => ({
    id: { type: GraphQLID },
    idApiPilote: { type: GraphQLInt },
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
  name: 'GPPilote',
  fields: () => ({
    id: { type: GraphQLID },
    gp: { type: GPType },
    driver: { type: DriverType },
    ecurie: { type: EcurieType }
  })
});

GPType = new GraphQLObjectType({
  name: 'GP',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    round: { type: GraphQLInt },
    track: { type: TrackType },
    dateTime: { type: GraphQLString },
    drivers: { type: new GraphQLList(DriverType) },
    classement: { type: new GraphQLList(require('./gp-classement.types').GPClassementType) }
  })
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

// Export des types
export { DriverType, EcurieType, DriverEcurieType, GPType, GPDriverType };
