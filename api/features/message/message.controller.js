const messageService = require("./message.service")
const logger = require("../../loaders/logger")

const messageController = {
  getAllMessages: async (req, res) => {
    logger.info("getAllMessages")
    try {
      const allMessages = await messageService.getAllMessages()

      res.send({ messages: allMessages })
    } catch (error) {
      res.status(400).send({
        type: "error",
        message: error.message
      })
    }
  },
  getAMessage: async (req, res) => {
    logger.info("getAMessage")

    const { messageId } = req.params
    try {
      const message = await messageService.getAMessage(messageId)

      res.send(message)
    } catch (error) {
      res.status(404).send({
        type: "error",
        message: error.message
      })
    }
  },
  addMessage: async (req, res) => {
    logger.info("addMessage", req.body)

    const { content, userId } = req.body

    try {
      const newMessage = await messageService.addMessage({ content, userId })

      res.send({
        message: newMessage
      })
    } catch (error) {
      res.status(400).send({
        type: "error",
        message: error.message
      })
    }
  },
  deleteMessage: async (req, res) => {
    logger.info("deleteMessage")

    const { messageId } = req.params

    try {
      const messageToDelete = await messageService.deleteMessage(messageId)

      if (!messageToDelete) {
        res.status(404).send({
          type: "error",
          message: `Book not found with id ${messageId}`
        })
      }

      res.send({
        status: 200,
        message: `Message with ID: ${messageId} deleted`,
        messageId
      })
    } catch (error) {
      res.status(400).send({
        type: "error",
        message: error.message
      })
    }
  }
}

module.exports = messageController
