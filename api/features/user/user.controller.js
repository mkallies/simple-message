const userService = require("./user.service")

const UserController = {
  createOrGetUser: async (req, res) => {
    console.log({ req })
    const { email } = req.body

    try {
      const user = await userService.getUser({ email })

      res.send(user)
    } catch (error) {
      res.send({
        status: 500,
        error
      })
    }
  }
}

module.exports = UserController
