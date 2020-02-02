const Validator = require('validator');
const isEmpty = require('is-empty');

const registerValidator = (data) => {
  const errors = {};
  const thisData = {
    name: !isEmpty(data.name) ? data.name : '',
    email: !isEmpty(data.email) ? data.email : '',
    password: !isEmpty(data.password) ? data.password : '',
    passwordConfirm: !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '',
  };

  // Name check
  if (Validator.isEmpty(thisData.name)) {
    errors.name = 'Name field is required';
  }

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

  if (Validator.isEmpty(thisData.passwordConfirm)) {
    errors.passwordConfirm = 'Password Confirm is required';
  }

  if (!Validator.isLength(thisData.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!Validator.equals(thisData.password, thisData.passwordConfirm)) {
    errors.passwordConfirm = 'Password must match';
  }

  return {
    errors: !isEmpty(errors) ? { ...errors, type: 'registration' } : errors,
    isValid: isEmpty(errors),
  };
};

module.exports = registerValidator;
