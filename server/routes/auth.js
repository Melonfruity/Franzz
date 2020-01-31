const authRouter = require('express').Router();
const passport = require('passport');
const { info } = require('../utils/logger');

require('../utils/passportSetup');

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

// exchanges code for details
authRouter.get('/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    res.send('/google/redirect');
  });

module.exports = authRouter;
