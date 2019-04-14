//----------IMPORTS-----------------------------//

const mongoose = require('mongoose');
const configDb = require('../config/configDb');

mongoose.plugin(schema => {
  schema.options.usePushEach = true;
});

//----------MODEL-SCHEMA------------------------//

const TalkSchema = mongoose.Schema({
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
  // usePushEach: true
});
const talkModel = (module.exports = mongoose.model('talkModel', TalkSchema));

//----------MODEL-METODS------------------------//

module.exports.findTalk = (talk, cb) => {
  talkModel.findOne({ users: talk.to, users: talk.from }, cb);
};

module.exports.saveTalk = (newTalk, cb) => {
  newTalk.save(cb);
};

module.exports.updateTalk = (room, messages, cb) => {
  talkModel.update({ room: room }, { $set: { messages: messages } }, cb);
};
