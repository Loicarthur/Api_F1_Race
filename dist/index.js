"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_resolver_1 = require("./resolvers/auth.resolver");
const f1_resolver_1 = require("./resolvers/f1.resolver");
dotenv_1.default.config();
const startServer = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    await (0, database_1.connectDB)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [auth_resolver_1.AuthResolver, f1_resolver_1.F1Resolver],
        emitSchemaFile: true,
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                req,
            };
        },
    });
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};
startServer().catch((error) => {
    console.error('Error starting server:', error);
});
//# sourceMappingURL=index.js.map