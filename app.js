//----------IMPORTS-------------------------//

const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  configDb = require("./config/configDb"),
  routes = require("./routes/routes"),
  socket = require("socket.io"),
  chat = require("./chat/chat")

//----------DB-CONNECTION------------------//

mongoose.connect(configDb.database)

//-----error-----//
mongoose.connection.on("error", err => {
  throw err
})

//-----connection-----//
mongoose.connection.once("open", () => {
  console.log("Connected to db")
})

//----------EXPRESS-APP--------------------//

const app = express(),
  port = 3000

//----------CLIENT <=> SERVER ( COMUNICATION DIFRENT PORTS )------//

app.use(cors())

//----------CLIENT-STATIC-FOLDER------//

app.use(express.static(path.join(__dirname, "ngClient")))

//----------BODY-PARSER ( JSON MSG ACCESS )------//

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//----------PASSPORT ( SESSION TOKEN )------//

app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)

//----------ROUTING-------------------------//

app.use("/", routes)

//----------START-SERVER--------------------//

let server = app.listen(port, () => {
    console.log("Server runing...")
  }),
  io = socket(server)

//----------WEB-SOCKET--------------------//

chat.start(io)
