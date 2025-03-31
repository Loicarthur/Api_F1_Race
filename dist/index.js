"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./schema/schema"));
const database_1 = __importDefault(require("./config/database"));
const sync_service_1 = require("./services/sync.service");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, database_1.default)()
    .then(() => {
    sync_service_1.syncService.initializeSync();
    app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => ({
        schema: schema_1.default,
        graphiql: {
            headerEditorEnabled: true,
        },
        context: { req },
    })));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
})
    .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map