//----------IMPORTS-------------------------//

const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  configDb = require('./config/configDb'),
  routes = require('./routes/routes'),
  socket = require('socket.io'),
  chat = require('./chat/chat');

//----------DB-CONNECTION------------------//

function connect() {
  const connectOptions = {
    useMongoClient: true,
    autoReconnect: true
  };

  const uri = configDb.database;

  mongoose.Promise = global.Promise;
  mongoose.connect(uri, connectOptions);
  // mongoose.connect(uri, connectOptions);

  // mongoose
  //   .connect(configDb.database, { useNewUrlParser: true })
  //   .then(() => console.log('connected db'))
  //   .catch(() => console.log('connected error'));
}

connect();
// mongoose.connect(configDb.database);

// //-----error-----//
// mongoose.connection.on('error', err => {
//   console.log('błąd bazy danych');
//   throw err;
// });

// //-----connection-----//
// mongoose.connection.once('open', () => {
//   console.log('Connected to db');
// });

//----------EXPRESS-APP--------------------//

const app = express(),
  port = process.env.PORT || 8080;

//----------CLIENT <=> SERVER ( COMUNICATION DIFRENT PORTS )------//

app.use(cors());

//----------CLIENT-STATIC-FOLDER------//

app.use(express.static(path.join(__dirname, 'ngClient')));

//----------BODY-PARSER ( JSON MSG ACCESS )------//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------PASSPORT ( SESSION TOKEN )------//

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//----------ROUTING-------------------------//

app.use('/', routes);

//----------START-SERVER--------------------//

let server = app.listen(port, () => {
    console.log('Server runing...');
  }),
  io = socket(server);

//----------WEB-SOCKET--------------------//

chat.start(io);
