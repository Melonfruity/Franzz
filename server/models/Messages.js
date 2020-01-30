/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
  },
  channel: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// This will check if the DB has only one unique instance of this User
MessageSchema.plugin(uniqueValidator);

// This will get rid of some unneeded formatting from mongoDB
MessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newObject = returnedObject;
    newObject.id = newObject._id.toString();
    delete newObject._id;
    delete newObject.__v;
    delete newObject.password;
  },
});

module.exports = mongoose.model('Messages', MessageSchema);
