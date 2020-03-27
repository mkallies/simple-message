const expressLoader = require("./express")
const { db } = require("./database")
const logger = require("./logger")
const config = require("../config")

module.exports = async ({ expressApp, express }) => {
  await expressLoader({ app: expressApp, express })
  logger.info("Express loaded")

  try {
    logger.info("Creating connection to DB", config.db.uri)

    await db.sequelize.authenticate()

    await db.sequelize.sync({ force: true })

    logger.info("Connected to DB")
  } catch (error) {
    console.log({ error })
    logger.error("DB failed to load %o", error)
  }
}
