"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const auth_resolver_1 = require("../resolvers/auth.resolver");
const f1_resolver_1 = require("../resolvers/f1.resolver");
const f1_history_resolver_1 = require("../resolvers/f1-history.resolver");
const f1_types_1 = require("./types/f1.types");
const race_history_1 = require("./types/race-history");
const auth_types_1 = require("./types/auth.types");
const f1Resolver = new f1_resolver_1.F1Resolver();
const f1HistoryResolver = new f1_history_resolver_1.F1HistoryResolver();
const RegisterInputType = new graphql_1.GraphQLInputObjectType({
    name: 'RegisterInput',
    fields: () => ({
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
const LoginInputType = new graphql_1.GraphQLInputObjectType({
    name: 'LoginInput',
    fields: () => ({
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        getPastRaces: {
            type: new graphql_1.GraphQLList(race_history_1.RaceHistoryType),
            args: {
                season: { type: graphql_1.GraphQLInt }
            },
            resolve: f1HistoryResolver.getPastRaceResults
        },
        getRaceDetails: {
            type: race_history_1.RaceHistoryType,
            args: {
                raceId: { type: graphql_1.GraphQLInt }
            },
            resolve: f1HistoryResolver.getRaceDetails
        },
        carData: {
            type: new graphql_1.GraphQLList(f1_types_1.CarDataType),
            args: {
                session_key: { type: graphql_1.GraphQLInt },
                driver_number: { type: graphql_1.GraphQLInt }
            },
            resolve: f1Resolver.getCarData
        },
        lapTimes: {
            type: new graphql_1.GraphQLList(f1_types_1.LapTimeType),
            args: {
                session_key: { type: graphql_1.GraphQLInt },
                driver_number: { type: graphql_1.GraphQLInt }
            },
            resolve: f1Resolver.getLapTimes
        },
        trackStatus: {
            type: f1_types_1.TrackStatusType,
            args: {
                session_key: { type: graphql_1.GraphQLInt }
            },
            resolve: f1Resolver.getTrackStatus
        },
        sessions: {
            type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                name: 'Session',
                fields: {
                    session_key: { type: graphql_1.GraphQLInt },
                    meeting_key: { type: graphql_1.GraphQLInt },
                    session_name: { type: graphql_1.GraphQLString },
                    session_type: { type: graphql_1.GraphQLString },
                    session_date: { type: graphql_1.GraphQLString }
                }
            })),
            args: {
                year: { type: graphql_1.GraphQLInt },
                round: { type: graphql_1.GraphQLInt },
                session_type: { type: graphql_1.GraphQLString }
            },
            resolve: f1Resolver.getSessions
        },
        sessionDetails: {
            type: new graphql_1.GraphQLObjectType({
                name: 'SessionDetails',
                fields: {
                    drivers: { type: new graphql_1.GraphQLList(new graphql_1.GraphQLObjectType({
                            name: 'Driver',
                            fields: {
                                driver_number: { type: graphql_1.GraphQLInt },
                                name: { type: graphql_1.GraphQLString },
                                team: { type: graphql_1.GraphQLString }
                            }
                        })) },
                    lapTimes: { type: new graphql_1.GraphQLList(f1_types_1.LapTimeType) },
                    trackStatus: { type: f1_types_1.TrackStatusType },
                    carData: { type: new graphql_1.GraphQLList(f1_types_1.CarDataType) }
                }
            }),
            args: {
                session_key: { type: graphql_1.GraphQLInt }
            },
            resolve: f1Resolver.getSessionDetails
        }
    })
});
const RootMutation = new graphql_1.GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        register: {
            type: auth_types_1.AuthResponseType,
            args: {
                input: { type: new graphql_1.GraphQLNonNull(RegisterInputType) }
            },
            resolve: auth_resolver_1.register
        },
        login: {
            type: auth_types_1.AuthResponseType,
            args: {
                input: { type: new graphql_1.GraphQLNonNull(LoginInputType) }
            },
            resolve: auth_resolver_1.login
        }
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
//# sourceMappingURL=schema.js.map