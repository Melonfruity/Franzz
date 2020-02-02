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

// Google
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

// exchanges code for details
authRouter.get('/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    res.send('/google/redirect');
  });

authRouter.post('/register', async (req, res, next) => {
  try {
    const { body } = req; // destructuring of req to body
    const { errors, isValid } = registerValidator(body);

    if (!isValid) {
      errm(errors);
      return res.status(401).json(errors);
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      name: body.name.toLowerCase(),
      email: body.email.toLowerCase(),
      password: passwordHash,
    });

    await user.save()
      // eslint-disable-next-line no-unused-vars
      .then((newUser) => {
        info(newUser);
        res.status(200).json({ success: true });
      })
      .catch((err) => next(err));
  } catch (err) {
    errm(err);
  }
  return false;
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const { errors, isValid } = loginValidator(body);

    if (!isValid) {
      res.status(401).json(errors);
    }

    const { email, password } = body;

    User.findOne({ email: email.toLowerCase() })
      .then((user) => {
        // Check if there is a user with that email and if one is found
        if (!user) {
          res.status(404).json({ error: 'email not found' });
        }
        // Check if password is good
        bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const payload = {
                id: user.id,
                name: user.name,
              };

              jwt.sign(
                payload,
                secretOrKey,
                {
                  expiresIn: 31556926, // 1 year
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer '.concat(token),
                  });
                },
              );
            } else {
              return res
                .status(400)
                .json({ error: 'password incorrect' });
            }
            return false;
          });
      })
      .catch((err) => next(err));
  } catch (err) {
    errm(err);
  }
});

module.exports = authRouter;
