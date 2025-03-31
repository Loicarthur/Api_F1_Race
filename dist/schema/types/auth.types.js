"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseType = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString }
    })
});
exports.AuthResponseType = new graphql_1.GraphQLObjectType({
    name: 'AuthResponse',
    fields: () => ({
        token: { type: graphql_1.GraphQLString },
        user: { type: exports.UserType }
    })
});
//# sourceMappingURL=auth.types.js.map