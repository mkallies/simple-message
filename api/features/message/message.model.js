module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    content: DataTypes.STRING
  })

  Message.associate = models => {
    Message.belongsTo(models.User)
  }

  return Message
}
