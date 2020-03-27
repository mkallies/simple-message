const { models } = require("../../loaders/database")

const userService = {
  getUser: async userObj => {
    try {
      let user = await models.User.findOne({ where: { email: userObj.email } })

      if (!user) {
        user = await models.User.create(userObj)
      }

      return user
    } catch (error) {
      throw error
    }
  }
}

module.exports = userService
