const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// utils
const { info, errm } = require('./utils/logger');
const { MONGODB_URL } = require('./utils/config');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware');

// initializing the server application
const app = express();
const server = http.Server(app);

// socketio connect with server
const io = socketio(server);

// routes
const authRouter = require('./routes/auth');
const channelRouter = require('./routes/channel');
const photoRouter = require('./routes/photos');
const rootRouter = require('./routes/root');

// connecting to mongodb
info('Connecting to MongoDB');

mongoose
  .connect(
    MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  )
  .then(() => info('Connected to MongoDB'))
  .catch((err) => errm(err));

app.use(cors({
  origin: true,
}));
app.use(cookieParser());

// Form and JSON data
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json()); // JSON

// the request with relevant data is logged
app.use(requestLogger);

// passport initialize
app.use(passport.initialize());
require('./utils/passportSetup');

// use routes
app.use('/api/auth', authRouter);
app.use('/api/channel', channelRouter);
app.use('/api/photos', photoRouter);
app.use('/', rootRouter);

// sockets channel namespace
require('./socketsio/channel')(io);


// error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = server;
