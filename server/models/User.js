/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// This will check if the DB has only one unique instance of this User
UserSchema.plugin(uniqueValidator);

// This will get rid of some unneeded formatting from mongoDB
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newObject = returnedObject;
    newObject.id = newObject._id.toString();
    delete newObject._id;
    delete newObject.__v;
    delete newObject.password;
  },
});

module.exports = mongoose.model('Users', UserSchema);
