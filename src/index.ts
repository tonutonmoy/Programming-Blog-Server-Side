// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

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
import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from "@prisma/client";
import { jwtHelper } from "./utils/jwtHelper"; // Adjust path accordingly
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { json } from 'body-parser';
import cors from 'cors';

export const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
  userInfo: any | null;
}

const startServer = async () => {
  const app = express();

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      // origin: 'http://localhost:5173', 
      origin: 'https://programming-blog-client-side.vercel.app', 
      methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        try {
          const userInfo = await jwtHelper.getUserInfoFromToken(
            req.headers.authorization as string
          );
          return {
            prisma,
            userInfo,
          };
        } catch (error) {
          console.error("Error in context function:", error);
          return {
            prisma,
            userInfo: null,
          };
        }
      },
    })
  );

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
