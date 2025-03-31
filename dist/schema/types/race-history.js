"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceHistoryType = void 0;
const graphql_1 = require("graphql");
const CircuitType = new graphql_1.GraphQLObjectType({
    name: 'Circuit',
    fields: {
        name: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString }
    }
});
const RaceHistoryDriverType = new graphql_1.GraphQLObjectType({
    name: 'RaceHistoryDriver',
    fields: {
        name: { type: graphql_1.GraphQLString },
        number: { type: graphql_1.GraphQLInt },
        image: { type: graphql_1.GraphQLString }
    }
});
const TeamType = new graphql_1.GraphQLObjectType({
    name: 'Team',
    fields: {
        name: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString }
    }
});
const RaceResultType = new graphql_1.GraphQLObjectType({
    name: 'RaceResult',
    fields: {
        position: { type: graphql_1.GraphQLInt },
        driver: { type: RaceHistoryDriverType },
        team: { type: TeamType },
        time: { type: graphql_1.GraphQLString },
        laps: { type: graphql_1.GraphQLInt },
        grid: { type: graphql_1.GraphQLInt },
        points: { type: graphql_1.GraphQLFloat },
        fastest_lap: { type: graphql_1.GraphQLString }
    }
});
exports.RaceHistoryType = new graphql_1.GraphQLObjectType({
    name: 'RaceHistory',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        competition: { type: graphql_1.GraphQLString },
        circuit: { type: CircuitType },
        season: { type: graphql_1.GraphQLInt },
        type: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        timezone: { type: graphql_1.GraphQLString },
        results: { type: new graphql_1.GraphQLList(RaceResultType) }
    }
});
//# sourceMappingURL=race-history.js.map