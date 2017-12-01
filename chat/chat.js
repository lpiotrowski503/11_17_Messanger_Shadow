module.exports = {
  start: io => {
    const talkModel = require('../models/talkModel')

    let users = []
    //---------------------------------------
    //  setting room
    //---------------------------------------
    let room = (socket, newTalk) => {
      let findedTalk = false

      socket.on(`chat-${newTalk._id}`, data => {
        this.newTalk.messages.push(data)

        //-----------------------------
        //  update talk
        //-----------------------------

        //------------------------
        //  save talk to db
        //------------------------
        talkModel.saveTalk(this.newTalk, (err, user) => {
          if (err) throw err
        })
        //------------------------------------------
        //  sending for client
        //------------------------------------------
        io.sockets.emit(`chat-${newTalk._id}`, data)
      })

      socket.on(`keydown-${newTalk._id}`, data => {
        socket.broadcast.emit(`keydown-${newTalk._id}`, data)
      })
    }
    //-------------------------------------------
    //  connection
    //-------------------------------------------
    io.on('connection', socket => {
      let newTalk
      let chatRoom

      socket.on('disconnect', () => {})
      //----------------------------------------------
      // opening new talk with array users and id talk
      //----------------------------------------------
      socket.on('callUser', data => {
        if (data.msg === 'connect talk') {
          //-----------------------------
          //  find talk
          //-----------------------------
          talkModel.findTalk(data, (err, talk) => {
            if (err) throw err
            if (talk) {
              if (
                (data.to === talk.users[0] || data.to === talk.users[1]) &&
                (data.from === talk.users[0] || data.from === talk.users[1])
              ) {
                this.newTalk = talk
                io.sockets.emit('callUser', this.newTalk)
              } else {
                this.newTalk = new talkModel({
                  users: [data.from, data.to]
                })
                io.sockets.emit('callUser', this.newTalk)
              }
            } else {
              this.newTalk = new talkModel({
                users: [data.from, data.to]
              })
              io.sockets.emit('callUser', this.newTalk)
            }
          })
        } else if (data.msg === 'call to user') {
          io.sockets.emit('callUser', data)
        }
      })
      //-----------------
      // go set chat room
      //-----------------
      socket.on('chatRoom', data => {
        room(socket, this.newTalk)
        socket.broadcast.emit('chatRoom', this.newTalk)
      })
      //--------------------------
      // listener loggin / loggout
      //--------------------------
      socket.on('logged', data => {
        if (users.length !== 0) {
          if (data.logged && users.indexOf(data.nick) === -1) {
            users.push(data.nick)
          }
          if (!data.logged && users.indexOf(data.nick) !== -1) {
            users.splice(users.indexOf(data.nick), 1)
          }
        } else {
          if (data.logged) {
            users.push(data.nick)
          }
        }
      })
      //--------------------
      // output logged users
      //--------------------
      socket.on('getUsers', data => {
        io.sockets.emit('getUsers', users)
      })
    })
  }
}
