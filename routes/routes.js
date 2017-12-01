//----------IMPORTS---------------------------------//

const express = require('express'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  path = require('path'),
  router = express.Router(),
  userModel = require('../models/userModel'),
  configDb = require('../config/configDb')

//----------ROUTING---------------------------------//

//-----register------//
router.post('/register', (req, res) => {
  if (req.body.nick === '' || req.body.pass === '') {
    console.log('puste pola')
  } else {
    let newUser = new userModel({
      nick: req.body.nick,
      pass: req.body.pass
    })

    userModel.getUserByNick(newUser.nick, (err, user) => {
      if (err) throw err
      if (!user) {
        userModel.addUser(newUser, (err, user) => {
          if (err) res.json({ success: false, msg: 'Registration failed' })
          else return res.json({ success: true, msg: 'Registration success' })
        })
      } else return res.json({ success: false, msg: 'User already exist' })
    })
  }
})

//-----login-------//
router.post('/auth', (req, res, next) => {
  const nick = req.body.nick,
    pass = req.body.pass

  userModel.getUserByNick(nick, (err, user) => {
    if (err) throw err
    if (!user) return res.json({ success: false, msg: 'Cannot find user' })

    userModel.comparePassword(pass, user.pass, (err, isMatch) => {
      if (err) throw err
      if (isMatch) {
        const token = jwt.sign({ data: user }, configDb.secret, {
          expiresIn: '7d'
        })
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: { id: user._id, nick: user.nick }
        })
      } else return res.json({ success: false, msg: 'Wrong password' })
    })
  })
})

//-----profile-----//
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({ user: req.user })
  }
)

//-----all-diffent-pages-----//
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ngClient/index.html'))
})

//----------EXPORT----------------------------------//

module.exports = router
