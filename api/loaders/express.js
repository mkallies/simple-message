const helmet = require("helmet")
const cors = require("cors")
const compression = require("compression")
const config = require("../config")
const messageRoutes = require("../features/message/message.routes")
const userRoutes = require("../features/user/user.routes")

const whitelist = ["http://localhost:3000", "postman"]

module.exports = ({ app, express }) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy")

  app.use(helmet())

  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => {
        if (whitelist.indexOf(origin) !== -1) {
          cb(null, true)
        } else {
          cb(new Error("Not allowed by CORS"))
        }
      }
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(compression())

  app.use(`${config.api.prefix}/messages`, messageRoutes)
  app.use(`${config.api.prefix}/user`, userRoutes)
  app.use(`${config.api.prefix}/health`, (req, res) => res.send("ok"))
}
