//----------IMPORTS-----------------------------//

const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  configDb = require('../config/configDb'),
  //----------MODEL-SCHEMA------------------------//

  UserSchema = mongoose.Schema({
    nick: {
      type: String,
      require: true
    },
    pass: {
      type: String,
      require: true
    }
  })

userModel = module.exports = mongoose.model('userModel', UserSchema)

//----------MODEL-METODS------------------------//

module.exports.getUserById = (id, cb) => {
  userModel.findById(id, cb)
}

module.exports.getUserByNick = (nick, cb) => {
  userModel.findOne({ nick: nick }, cb)
}

module.exports.addUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.pass, salt, (err, hash) => {
      if (err) {
        throw err
      }
      newUser.pass = hash
      newUser.save(cb)
    })
  })
}

module.exports.comparePassword = (candidatePassword, hash, cb) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err
    cb(null, isMatch)
  })
}
