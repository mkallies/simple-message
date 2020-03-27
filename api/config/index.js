const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI
  },
  logger: {
    level: process.env.LOG_LEVEL || "silly"
  },
  api: {
    prefix: "/api"
  },
  isProd: process.env.NODE_ENV === "production",
  isDev: process.env.NODE_ENV === "development"
}
