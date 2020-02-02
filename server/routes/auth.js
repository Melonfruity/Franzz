const authRouter = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info, errm } = require('../utils/logger');

// Validation
const loginValidator = require('../utils/validation/login_validator');
const registerValidator = require('../utils/validation/register_validation');

const { secretOrKey } = require('../utils/config');
require('../utils/passportSetup');

// User model
const User = require('../models/User');

authRouter.post('/google', async (req, res) => {
  try {
    const { profileObj, accessToken } = req.body;
    const { email, googleId } = profileObj;

    // find the user
    const user = await User.findOne({ email });

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
    }
  } catch (err) {
    errm(err);
  }

  res.send({ message: 'message' });
});

module.exports = authRouter;
