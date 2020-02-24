require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Pusher = require('pusher');

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

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'mt1',
  encrypted: true,
});

// routes
const authRouter = require('./routes/auth');
const channelRouter = require('./routes/channel');
const photoRouter = require('./routes/photos');
const pusherRouter = require('./routes/pusher');
const rootRouter = require('./routes/root');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// the request with relevant data is logged
app.use(requestLogger);

// passport initialize
app.use(passport.initialize());
require('./utils/passportSetup');

// use routes
app.use('/api/auth', authRouter);
app.use('/api/channel', channelRouter);
app.use('/api/photos', photoRouter);
app.use('/api/pusher', pusherRouter(pusher));
app.use('/', rootRouter);

// sockets channel
require('./socketsio/socketio')(io);

// error handling
app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = server;
