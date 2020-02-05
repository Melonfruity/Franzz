const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../utils/config');

const saltRounds = 10;

const login = (password, passHash) => {
  return bcrypt.compareSync(password, passHash);
};

const register = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const signJWT = (res, user) => {
  const payload = {
    id: user.id,
  };

  jwt.sign(
    payload,
    secretOrKey,
    {
      expiresIn: 31556926, // 1 year
    },
    (err, token) => {
      res.status(200).json({
        success: true,
        token: 'Bearer '.concat(token),
        user,
      });
    },
  );
};

module.exports = {
  login,
  register,
  signJWT,
};
