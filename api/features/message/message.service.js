const { models } = require("../../loaders/database")
const isPalindrome = require("../../utils/is-palindrome")

const messageService = {
  getAllMessages: async () => {
    try {
      return await models.Message.findAll({ order: [["createdAt", "DESC"]] })
    } catch (error) {
      throw error
    }
  },
  getAMessage: async id => {
    try {
      const message = await models.Message.findOne({
        include: models.User,
        where: { id }
      })

      if (!message) return null

      return {
        message,
        isPalindrome: isPalindrome(message.content)
      }
    } catch (error) {
      throw error
    }
  },
  addMessage: async message => {
    try {
      return await models.Message.create(message)
    } catch (error) {
      throw error
    }
  },
  deleteMessage: async id => {
    try {
      const messageExists = await models.Message.findOne({ where: { id } })

      if (messageExists) {
        const deleted = await models.Message.destroy({ where: { id } })
        return deleted
      }

      return null
    } catch (error) {
      throw error
    }
  }
}

module.exports = messageService
