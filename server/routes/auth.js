const authRouter = require('express').Router();
const axios = require('axios');

const {
  login,
  register,
  signJWT,
  extractJWT,
} = require('../utils/helpers/authHelper');

// Validation
const formValidator = require('../utils/formValidator');

// User model
const User = require('../models/User');

// login using google
authRouter.post('/google', async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const { authorization } = req.headers;
    // check if it's a valid google access token
    const { data } = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    const { email } = data;
    // if there's no error
    if (data) {
      // check if logging in or registering
      // if this is a registering guest using google
      if (authorization !== 'undefined') {
        const user = await extractJWT(authorization);
        if (!user.email) {
          user.email = email;
        }
        user.googleProvider = {
          token: accessToken,
        };
        await user.save();
        signJWT(res, user);
      } else {
        // just logging in
        const googleUser = await User.findOne({ email });
        if (googleUser) {
          signJWT(res, googleUser);
        } else {
          res.json({ error: 'not registered!' });
        }
      }
    // someone is trying to use a fake access token!
    } else {
      res.json({ error: 'nice try hacker' });
    }
  } catch (err) {
    next(err);
  }
});

// register route for users not using a google account
authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { isValid, errors } = formValidator({ email, password });
    const { authorization } = req.headers;
    // check if valid email, password
    if (isValid) {
      // find the user through their email
      const user = await User.findOne({ email });
      if (!user) {
        // if there is a token
        if (authorization !== 'undefined') {
          console.log(req.body)
          const updatedUser = await extractJWT(authorization);
          if (!updatedUser.email && !updatedUser.password) {
            updatedUser.email = email;
            updatedUser.password = register(password);
          }
          await updatedUser.save();
          signJWT(res, updatedUser);
        }
      } else {
        res.json({ error: 'email already taken' });
      }
    } else {
      res.json({ error: errors });
    }
  } catch (err) {
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
          signJWT(res, user);
        } else {
          res.status(404).json({ error: 'incorrect password' });
        }
      } else {
        res.json({ error: 'user does not exist' });
      }
    } else {
      res.json({ error: errors });
    }
  } catch (err) {
    next(err);
  }
});

// add a password the the user
// update the username of the user
authRouter.post('/username', async (req, res, next) => {
  try {
    const { userID, newUsername } = req.body;
    const user = await User.findByIdAndUpdate(userID, { username: newUsername });
    if (user) {
      res.status(200).json(user.username);
    } else {
      res.status(404).json({ error: 'userID bad' });
    }
  } catch (err) {
    next(err);
  }
});

authRouter.post('/guest', async (req, res, next) => {
  try {
    const { username } = req.body;
    const guest = new User({
      username,
    });
    const tempGuest = await guest.save();
    signJWT(res, tempGuest);
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;
