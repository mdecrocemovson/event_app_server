import { PrismaClient, Prisma } from "@prisma/client";

const BASE_LOG_OPTIONS = ["info", "warn", "error"];
const LOG_OPTIONS = (
  process.env.LOG_PRISMA_QUERIES === "true"
    ? [...BASE_LOG_OPTIONS, "query"]
    : BASE_LOG_OPTIONS
).map((level) => ({ level, emit: "event" }));
// This gnarly type parameter is needed to convince the TypeScript compiler that dynamically configuring Prisma's logger like this is cool.
const prisma = new PrismaClient<
  Prisma.PrismaClientOptions,
  "query" | "info" | "warn" | "error"
>({ log: LOG_OPTIONS as Prisma.LogDefinition[] });

// prisma.$on("query", ({ query }) => logger.debug(query));
// prisma.$on("info", ({ message }) => logger.info(message));
// prisma.$on("warn", ({ message }) => logger.warn(message));
// prisma.$on("error", ({ message }) => logger.error(message));

export default prisma;
