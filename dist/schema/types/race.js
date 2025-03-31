"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingRaceType = exports.PastRaceType = exports.RaceType = void 0;
const graphql_1 = require("graphql");
const TeamType = new graphql_1.GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString }
    })
});
const CircuitType = new graphql_1.GraphQLObjectType({
    name: 'Circuit',
    fields: () => ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
const CompetitionType = new graphql_1.GraphQLObjectType({
    name: 'Competition',
    fields: () => ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        country: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
const DriverResultType = new graphql_1.GraphQLObjectType({
    name: 'DriverResult',
    fields: () => ({
        driver_name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        driver_trigram: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        driver_team: { type: new graphql_1.GraphQLNonNull(TeamType) },
        timer: { type: graphql_1.GraphQLString },
        position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        points: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    })
});
const P10Type = new graphql_1.GraphQLObjectType({
    name: 'P10',
    fields: () => ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        trigram: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        team: { type: new graphql_1.GraphQLNonNull(TeamType) }
    })
});
exports.RaceType = new graphql_1.GraphQLObjectType({
    name: 'Race',
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        competition: { type: new graphql_1.GraphQLNonNull(CompetitionType) },
        circuit: { type: new graphql_1.GraphQLNonNull(CircuitType) },
        date: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        result: { type: new graphql_1.GraphQLList(DriverResultType) },
        p10: { type: P10Type }
    })
});
exports.PastRaceType = new graphql_1.GraphQLObjectType({
    name: 'PastRace',
    fields: () => ({
        race: { type: new graphql_1.GraphQLNonNull(exports.RaceType) }
    })
});
exports.UpcomingRaceType = new graphql_1.GraphQLObjectType({
    name: 'UpcomingRace',
    fields: () => ({
        race: { type: new graphql_1.GraphQLNonNull(exports.RaceType) }
    })
});
//# sourceMappingURL=race.js.map