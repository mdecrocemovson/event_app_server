import {
  ApolloServerPlugin,
  GraphQLRequestContext,
} from "apollo-server-plugin-base";
import { ApolloContext } from "./server";
import { performance } from "perf_hooks";
import logger from "./logger";

// const loggingPlugin: ApolloServerPlugin<ApolloContext> = {
//   requestDidStart(requestContext: GraphQLRequestContext<ApolloContext>) {
//     const start = performance.now();
//     logger.debug(requestContext.request.query);
//     logger.debug(requestContext.request.variables);
//     return {
//       willSendResponse(requestContext) {
//         const end = performance.now();
//         logger.info(
//           `${requestContext.request.operationName} -- ${(end - start).toFixed(
//             2
//           )} ms`
//         );
//       },
//     };
//   },
// };

export const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: GraphQLRequestContext<ApolloContext>) {
    logger.debug(requestContext.request.query);
    logger.debug(requestContext.request.variables);
    console.log("Request name:" + requestContext.request.operationName);
    console.log("");
  },
};

// export default loggingPlugin;
