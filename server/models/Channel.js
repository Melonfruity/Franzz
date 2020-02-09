/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

// This will get rid of some unneeded formatting from mongoDB
ChannelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Channels', ChannelSchema);
