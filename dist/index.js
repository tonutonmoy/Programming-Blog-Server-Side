"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const client_1 = require("@prisma/client");
const jwtHelper_1 = require("./utils/jwtHelper");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
exports.prisma = new client_1.PrismaClient();
const main = async () => {
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            try {
                const userInfo = await jwtHelper_1.jwtHelper.getUserInfoFromToken(req.headers.authorization);
                return {
                    prisma: exports.prisma,
                    userInfo,
                };
            }
            catch (error) {
                console.error("Error in context function:", error);
                return {
                    prisma: exports.prisma,
                    userInfo: null,
                };
            }
        },
    });
    console.log(`Server ready at: ${url}`);
};
main().catch((error) => {
    console.error("Error starting server:", error);
});
