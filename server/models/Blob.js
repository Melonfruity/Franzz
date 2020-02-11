/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const BlobSchema = mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channels',
  },
  messages: [{
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Messages',
    },
  }],
  created: {
    type: Date,
    default: new Date(),
  },
});

// This will get rid of some unneeded formatting from mongoDB
BlobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blobs', BlobSchema);
