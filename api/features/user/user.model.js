module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    }
  })

  User.associate = models => {
    User.hasMany(models.Message, {
      as: "messages"
    })
  }

  User.findByEmail = async email => {
    let user = await User.findOne({
      where: { email }
    })

    if (!user) {
      user = await User.create({
        email
      })
    }

    return user
  }

  return User
}
