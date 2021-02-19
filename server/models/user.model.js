const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email_address: DataTypes.STRING,
    role: DataTypes.STRING
  }, {})

  function cryptPassword (password) {
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return reject(err)
        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) return reject(err)
          return resolve(hash)
        })
      })
    })
  }

  User.beforeCreate(function (user, options) {
    return cryptPassword(user.password)
      .then((success) => {
        user.password = success
      })
      .catch((err) => console.log(err))
  })

  User.beforeBulkCreate(function (user, options) {
    return cryptPassword(user.password)
      .then((success) => {
        user.password = success
      })
      .catch((err) => console.log(err))
  })

  return User
}
