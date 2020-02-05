const mongoose = require('mongoose');
const { Strategy } = require('passport-jwt'); // JwtStrategy
const { ExtractJwt } = require('passport-jwt');
const { secretOrKey } = require('./config');
const { errm } = require('../utils/logger');

const User = mongoose.model('Users');

const issuePassport = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secretOrKey;

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      // User is the mongoose model that was made to interface MongoDB
      // It provides querying functions like findById...
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => errm(err));
    }),
  );
};

module.exports = issuePassport;
