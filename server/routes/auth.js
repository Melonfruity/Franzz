const authRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const { info, errm } = require('../utils/logger');
const { login, register } = require('../utils/helpers/authHelper');

// Validation
const formValidator = require('../utils/formValidator');

const { secretOrKey } = require('../utils/config');
require('../utils/passportSetup');

// User model
const User = require('../models/User');

// login using google
authRouter.post('/google', async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    // check if it's a valid google access token
    const accessTokenCheck = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);

    // if there's no error
    if (!accessTokenCheck.error) {
      const { profileObj } = req.body;
      const { email, googleId } = profileObj;
      // find the user through their email
      const user = await User.findOne({ email });

      // if there is no user, make a new one
      if (!user) {
        const newUser = new User({
          username: '',
          email,
          googleProvider: {
            id: googleId,
            token: accessToken,
          },
        });
        await newUser.save();
        res.json(newUser);
      // update the access token for that google user
      } else {
        user.googleProvider = {
          id: googleId,
          token: accessToken,
        };
        await user.save();
        res.json(user);
      }
    // someone is trying to use a fake access token!
    } else {
      res.json({ error: 'nice try hacker' });
    }
  } catch (err) {
    errm(err);
    next(err);
  }
});

// register route for users not using a google account
authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { isValid, errors } = formValidator({ email, password });
    // check if valid email, password
    if (isValid) {
      // find the user through their email
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          email,
          password: register(password),
        });
        await newUser.save();
        res.json(newUser);
      } else {
        res.json({ error: 'email already taken' });
      }
    } else {
      res.json({ error: errors });
    }
  } catch (err) {
    errm(err);
    next(err);
  }
});

// login route for users not using a google account
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { isValid, errors } = formValidator({ email, password });
    // check if valid email, password
    if (isValid) {
      const user = await User.findOne({ email });
      if (user) {
        const check = login(password, user.password);
        if (check) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: 'incorrect password' });
        }
      }
    } else {
      res.json({ error: errors });
    }
  } catch (err) {
    errm(err);
    next(err);
  }
});

// add a password the the user
// update the username of the user
authRouter.post('/username', async (req, res, next) => {
  try {
    const { userID } = req.body;
    // check if valid email, password
    if (isValid) {
      const user = await User.findOne({ email });
      if (user) {
        const check = login(password, user.password);
        if (check) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: 'incorrect password' });
        }
      }
    } else {
      res.json({ error: errors });
    }
  } catch (err) {
    errm(err);
    next(err);
  }
});
// stretch
// update password

module.exports = authRouter;
