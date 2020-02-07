const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../utils/config');

const User = require('../../models/User');

const saltRounds = 10;

const login = (password, passHash) => bcrypt.compareSync(password, passHash);

const register = (password) => bcrypt.hashSync(password, saltRounds);

const signJWT = (res, user) => {
  const payload = {
    userID: user.id,
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
        channels: user.channels,
      });
    },
  );
};

const extractJWT = async (authorization, updateGuest) => {
  if (authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const { userID } = jwt.verify(token, secretOrKey);
    const user = await User.findByIdAndUpdate(userID, updateGuest);
    return user;
  }
};

module.exports = {
  login,
  register,
  signJWT,
  extractJWT,
};
