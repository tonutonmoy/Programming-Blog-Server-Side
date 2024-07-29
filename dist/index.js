"use strict";
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// import { PrismaClient, Prisma } from "@prisma/client";
// import { DefaultArgs } from "@prisma/client/runtime/library";
// import { jwtHelper } from "./utils/jwtHelper";
// import { typeDefs } from "./schema";
// import { resolvers } from "./resolvers";
// export const prisma = new PrismaClient();
// interface Context {
//   prisma: any;
//   userInfo: any | null;
// }
// const main = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({ req }): Promise<Context | undefined> => {
//       try {
//         const userInfo = await jwtHelper.getUserInfoFromToken(
//           req.headers.authorization as string
//         );
//         return {
//           prisma,
//           userInfo,
//         };
//       } catch (error) {
//         console.error("Error in context function:", error);
//         return {
//           prisma,
//           userInfo: null,
//         };
//       }
//     },
//   });
//   console.log(`Server ready at: ${url}`);
// };
// main().catch((error) => {
//   console.error("Error starting server:", error);
// });
// src/index.ts
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const client_1 = require("@prisma/client");
const jwtHelper_1 = require("./utils/jwtHelper"); // Adjust path accordingly
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
exports.prisma = new client_1.PrismaClient();
const startServer = async () => {
    const app = (0, express_1.default)();
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
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
    }));
    app.get('/health', (req, res) => {
        res.send('Server is healthy');
    });
    app.listen(4000, () => {
        console.log(`Server is running on http://localhost:4000/graphql`);
    });
};
startServer().catch((error) => {
    console.error("Error starting server:", error);
});
