/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
    },
  },
  channels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

// This will get rid of some unneeded formatting from mongoDB
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    return returnedObject;
  },
});

module.exports = mongoose.model('Users', UserSchema);
