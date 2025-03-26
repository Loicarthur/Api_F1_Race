import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLFloat } from 'graphql';

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
let PiloteType: GraphQLObjectType;
let EcurieType: GraphQLObjectType;
let PiloteEcurieType: GraphQLObjectType;
let GPType: GraphQLObjectType;
let GPPiloteType: GraphQLObjectType;
let GPClassementType: GraphQLObjectType;

// Initialisation des types avec leurs champs
PiloteType = new GraphQLObjectType({
  name: 'Pilote',
  fields: () => ({
    id: { type: GraphQLID },
    idApiPilote: { type: GraphQLInt },
    name: { type: GraphQLString },
    pictureUrl: { type: GraphQLString },
    nameAcronym: { type: GraphQLString },
    ecuries: { type: new GraphQLList(PiloteEcurieType) }
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
    pilotes: { type: new GraphQLList(PiloteEcurieType) }
  })
});

PiloteEcurieType = new GraphQLObjectType({
  name: 'PiloteEcurie',
  fields: () => ({
    id: { type: GraphQLID },
    pilote: { type: PiloteType },
    ecurie: { type: EcurieType },
    year: { type: GraphQLString }
  })
});

GPPiloteType = new GraphQLObjectType({
  name: 'GPPilote',
  fields: () => ({
    id: { type: GraphQLID },
    gp: { type: GPType },
    pilote: { type: PiloteType },
    ecurie: { type: EcurieType }
  })
});

GPClassementType = new GraphQLObjectType({
  name: 'GPClassement',
  fields: () => ({
    id: { type: GraphQLID },
    gp: { type: GPType },
    gpPilote: { type: GPPiloteType },
    isDNF: { type: GraphQLBoolean },
    position: { type: GraphQLInt }
  })
});

GPType = new GraphQLObjectType({
  name: 'GP',
  fields: () => ({
    id: { type: GraphQLID },
    idApiRace: { type: GraphQLInt },
    season: { type: GraphQLString },
    datetime: { type: GraphQLString },
    track: { type: TrackType },
    pilotes: { type: new GraphQLList(GPPiloteType) },
    classement: { type: new GraphQLList(GPClassementType) }
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
export { PiloteType, EcurieType, PiloteEcurieType, GPType, GPPiloteType, GPClassementType };
