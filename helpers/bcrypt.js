const bcrypt = require('bcryptjs')

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10)
  },
  comparePassword: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  }
}


