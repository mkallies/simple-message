const pino = require("pino")

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint:
    process.env.NODE_ENV === "production" ? false : { colorize: true }
})

module.exports = logger
