const { Router } = require("express")

const healthRouter = Router()

module.exports = router => {
  router.use("/health", healthRouter)

  healthRouter.get("/", (req, res) => {
    return res.send("ok")
  })
}
