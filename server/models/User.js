/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
  // channels: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Channel',
  // }],
  channels: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

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
