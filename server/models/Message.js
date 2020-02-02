/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
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

// This will get rid of some unneeded formatting from mongoDB
MessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Messages', MessageSchema);
