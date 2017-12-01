//----------IMPORTS-----------------------------//

const mongoose = require('mongoose'),
  configDb = require('../config/configDb'),
  //----------MODEL-SCHEMA------------------------//

  TalkSchema = mongoose.Schema({
    room: {
      type: String,
      require: true
    },
    users: {
      type: Array,
      require: true
    },
    messages: {
      type: Array,
      require: false
    }
  }),
  talkModel = (module.exports = mongoose.model('talkModel', TalkSchema))

//----------MODEL-METODS------------------------//

module.exports.findTalk = (talk, cb) => {
  talkModel.findOne({ users: talk.to, users: talk.from }, cb)
}

module.exports.saveTalk = (newTalk, cb) => {
  newTalk.save(cb)
}

module.exports.updateTalk = (room, messages, cb) => {
  talkModel.update({ room: room }, { $set: { messages: messages } }, cb)
}
