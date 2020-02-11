/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  message: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channels',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// This will get rid of some unneeded formatting from mongoDB
MessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

module.exports = mongoose.model('Messages', MessageSchema);
