/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  users: [{
    type: mongoose.schema.Types.ObjectId,
    ref: 'User',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

// This will check if the DB has only one unique instance of this User
// ChannelSchema.plugin(uniqueValidator);

// This will get rid of some unneeded formatting from mongoDB
ChannelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const newObject = returnedObject;
    newObject.id = newObject._id.toString();
  },
});

module.exports = mongoose.model('Channels', ChannelSchema);
