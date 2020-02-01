const Validator = require('validator');
const isEmpty = require('is-empty');

const loginValidator = (data) => {
  const errors = {};
  const thisData = {
    email: !isEmpty(data.email) ? data.email : '',
    password: !isEmpty(data.password) ? data.password : '',
  };

  // Email check
  if (Validator.isEmpty(thisData.email)) {
    errors.email = 'Name field is required';
  } else if (!Validator.isEmail(thisData.email)) {
    errors.email = 'Email is invalid';
  }

  // Password check
  if (Validator.isEmpty(thisData.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(thisData.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    errors: !isEmpty(errors) ? { ...errors, type: 'login' } : errors,
    isValid: isEmpty(errors),
  };
};

module.exports = loginValidator;
