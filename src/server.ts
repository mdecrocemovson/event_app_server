import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";
const { ApolloServer } = require("apollo-server");
import { myPlugin } from "./logging";
import { PrismaClient, User } from "@prisma/client";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [myPlugin],
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

export type ApolloContext = {
  db: PrismaClient;
  reqUser?: User;
  accessToken?: string;
  userEmail?: string;
};
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
