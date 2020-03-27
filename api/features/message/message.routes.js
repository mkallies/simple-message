const { Router } = require("express")
const MessageController = require("./message.controller")

const router = Router()

router.get("/", MessageController.getAllMessages)
router.post("/", MessageController.addMessage)
router.get("/:messageId", MessageController.getAMessage)
router.delete("/:messageId", MessageController.deleteMessage)

module.exports = router
