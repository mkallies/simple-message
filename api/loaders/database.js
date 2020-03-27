const Sequelize = require("sequelize")
const config = require("../config")

const db = {}

const sequelize = new Sequelize(config.db.uri)

const models = {
  User: sequelize.import("../features/user/user.model.js"),
  Message: sequelize.import("../features/message/message.model.js")
}

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = { db, models }
