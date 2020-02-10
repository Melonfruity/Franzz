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
        res.json({ user: newUser });
      // update the access token for that google user
      } else {
        user.googleProvider = {
          id: googleId,
          token: accessToken,
        };
        await user.save();
        signJWT(res, user);
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
    const { email, password, username } = req.body;
    const { isValid, errors } = formValidator({ email, password });
    const { authorization } = req.headers;
    // check if valid email, password
    if (isValid) {
      // find the user through their email
      const user = await User.findOne({ email });
      if (!user) {
        // if there is a token and the user has a username token
        if (authorization && typeof username === 'string') {
          const updateGuest = {
            email,
            password: register(password),
            username,
          };
          const updatedUser = extractJWT(res, authorization, updateGuest);
          signJWT(res, updatedUser);
        } else {
          const newUser = new User({
            email,
            password: register(password),
          });
          await newUser.save();
          // sign a token and send it
          signJWT(res, newUser);
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
        console.log(user);
        if (check) {
          signJWT(res, user);
        } else {
          res.status(404).json({ error: 'incorrect password' });
        }
      } else {
        res.json({ error: 'user does not exist' });
      }
    } else {
      console.log('sdsada');
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
