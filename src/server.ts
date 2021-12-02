import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";
const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
