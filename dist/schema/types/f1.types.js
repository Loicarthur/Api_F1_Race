"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPClassementType = exports.GPPiloteType = exports.GPType = exports.PiloteEcurieType = exports.EcurieType = exports.PiloteType = exports.TrackStatusType = exports.LapTimeType = exports.CarDataType = exports.TrackType = exports.AvatarType = void 0;
const graphql_1 = require("graphql");
exports.AvatarType = new graphql_1.GraphQLObjectType({
    name: 'Avatar',
    fields: {
        id: { type: graphql_1.GraphQLID },
        pictureAvatarUrl: { type: graphql_1.GraphQLString }
    }
});
exports.TrackType = new graphql_1.GraphQLObjectType({
    name: 'Track',
    fields: {
        id: { type: graphql_1.GraphQLID },
        idApiTrack: { type: graphql_1.GraphQLInt },
        countryName: { type: graphql_1.GraphQLString },
        trackName: { type: graphql_1.GraphQLString },
        pictureCountryUrl: { type: graphql_1.GraphQLString },
        pictureTrackUrl: { type: graphql_1.GraphQLString }
    }
});
let PiloteType;
let EcurieType;
let PiloteEcurieType;
let GPType;
let GPPiloteType;
let GPClassementType;
exports.PiloteType = PiloteType = new graphql_1.GraphQLObjectType({
    name: 'Pilote',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        idApiPilote: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        pictureUrl: { type: graphql_1.GraphQLString },
        nameAcronym: { type: graphql_1.GraphQLString },
        ecuries: { type: new graphql_1.GraphQLList(PiloteEcurieType) }
    })
});
exports.EcurieType = EcurieType = new graphql_1.GraphQLObjectType({
    name: 'Ecurie',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        idApiEcurie: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        logoUrl: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString },
        pilotes: { type: new graphql_1.GraphQLList(PiloteEcurieType) }
    })
});
exports.PiloteEcurieType = PiloteEcurieType = new graphql_1.GraphQLObjectType({
    name: 'PiloteEcurie',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        pilote: { type: PiloteType },
        ecurie: { type: EcurieType },
        year: { type: graphql_1.GraphQLString }
    })
});
exports.GPPiloteType = GPPiloteType = new graphql_1.GraphQLObjectType({
    name: 'GPPilote',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        gp: { type: GPType },
        pilote: { type: PiloteType },
        ecurie: { type: EcurieType }
    })
});
exports.GPClassementType = GPClassementType = new graphql_1.GraphQLObjectType({
    name: 'GPClassement',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        gp: { type: GPType },
        gpPilote: { type: GPPiloteType },
        isDNF: { type: graphql_1.GraphQLBoolean },
        position: { type: graphql_1.GraphQLInt }
    })
});
exports.GPType = GPType = new graphql_1.GraphQLObjectType({
    name: 'GP',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        idApiRace: { type: graphql_1.GraphQLInt },
        season: { type: graphql_1.GraphQLString },
        datetime: { type: graphql_1.GraphQLString },
        track: { type: exports.TrackType },
        pilotes: { type: new graphql_1.GraphQLList(GPPiloteType) },
        classement: { type: new graphql_1.GraphQLList(GPClassementType) }
    })
});
exports.CarDataType = new graphql_1.GraphQLObjectType({
    name: 'CarData',
    fields: {
        brake: { type: graphql_1.GraphQLInt },
        date: { type: graphql_1.GraphQLString },
        driver_number: { type: graphql_1.GraphQLInt },
        drs: { type: graphql_1.GraphQLInt },
        meeting_key: { type: graphql_1.GraphQLInt },
        n_gear: { type: graphql_1.GraphQLInt },
        rpm: { type: graphql_1.GraphQLInt },
        session_key: { type: graphql_1.GraphQLInt },
        speed: { type: graphql_1.GraphQLInt },
        throttle: { type: graphql_1.GraphQLInt }
    }
});
exports.LapTimeType = new graphql_1.GraphQLObjectType({
    name: 'LapTime',
    fields: {
        driver_number: { type: graphql_1.GraphQLInt },
        lap_number: { type: graphql_1.GraphQLInt },
        lap_time: { type: graphql_1.GraphQLFloat },
        sector_1: { type: graphql_1.GraphQLFloat },
        sector_2: { type: graphql_1.GraphQLFloat },
        sector_3: { type: graphql_1.GraphQLFloat },
        session_key: { type: graphql_1.GraphQLInt },
        date: { type: graphql_1.GraphQLString }
    }
});
exports.TrackStatusType = new graphql_1.GraphQLObjectType({
    name: 'TrackStatus',
    fields: {
        status: { type: graphql_1.GraphQLString },
        message: { type: graphql_1.GraphQLString },
        session_key: { type: graphql_1.GraphQLInt },
        date: { type: graphql_1.GraphQLString }
    }
});
//# sourceMappingURL=f1.types.js.map