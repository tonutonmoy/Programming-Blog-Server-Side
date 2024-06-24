import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { jwtHelper } from "./utils/jwtHelper";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

export const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: any | null;
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context | undefined> => {
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
  });

  console.log(`Server ready at: ${url}`);
};

main().catch((error) => {
  console.error("Error starting server:", error);
});
