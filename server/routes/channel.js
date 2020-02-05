const channelRouter = require('express').Router();
const passport = require('passport');
const { partOfChannel } = require('../utils/helpers/channelHelper');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');
// const Blob = require('../models/Blob');
const User = require('../models/User');

// get channel and initial messages
channelRouter.get('/initialize', async (req, res, next) => {
  try {
    const { channelIDs } = req.params;

    // const messages = await Message.find({
    //   created: {
    //     $gte: new Date(new Date().setHours('00', '00', '00')),
    //     $lt: new Date(new Date().setHours('23', '59', '59')),
    //   },
    //   channel: channelID,
    // }).sort({ created: 'asc' });
    const channels = await Message.find({
      channel: {
        $in: channelIDs,
      },
    });
    res.json(channels);
  } catch (err) {
    next(err);
  }
});

// create a new channel
channelRouter.post('/new', async (req, res, next) => {
  try {
    const { channelName, userID } = req.body;

    // check if there is a user by this id
    const user = await User.findById(userID);

    const channel = new Channel({
      name: channelName,
      users: [user.id],
    });

    // save the new channel to the db
    const newChannel = await channel.save();

    // add the new channel id to the user channels array
    user.channels = user.channels.concat(newChannel.id);

    // update that user
    await user.save();

    // send back the channel data, subjected to change
    res.json(newChannel);
  } catch (err) {
    next(err);
  }
});

// join a channel
channelRouter.put('/join/:channelID', async (req, res, next) => {
  try {
    // link the relations if all things are valid
    const { channelID } = req.params;
    const { userID } = req.body;
    // these will throw an error if a find doesn't work
    const channel = await Channel.findById(channelID);
    const user = await User.findById(userID);

    // check if the user is already a part of the channel
    if (!partOfChannel(channel.users, userID)) {
      // save the new relations
      channel.users = channel.users.concat(userID);
      user.channels = user.channels.concat(channelID);

      await channel.save();
      await user.save();
    }
    res.status(200).json(channel);
  } catch (err) {
    next(err);
  }
});

// new messages to the server
channelRouter.post('/messages', passport.authenticate('jwt', { session: false }), async (req, res, next) => {

  try {
    const { channel, message } = req.body;
    const { id } = req.user;

    const newMessage = new Message({
      message,
      channel,
      user: id,
    });

    const savedMessage = await newMessage.save();
    res.end();
  } catch (err) {
    next(err);
  }
});

// delete messages

// stretch
// // get a channel join link
// channelRouter.get('/link', async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = channelRouter;
