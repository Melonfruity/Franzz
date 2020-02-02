const bcrypt = require('bcrypt');

const saltRounds = 10;

const login = (password, passHash) => {
  return bcrypt.compareSync(password, passHash);
};

const register = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

module.exports = {
  login,
  register,
};
