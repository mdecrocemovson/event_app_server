import * as winston from "winston";

const format =
  process.env.NODE_ENV === "production"
    ? winston.format.simple()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      );
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format,
  transports: [new winston.transports.Console()],
});

export default logger;
