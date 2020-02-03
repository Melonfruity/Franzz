const channelRouter = require('express').Router();
const { info, errm } = require('../utils/logger');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');
const User = require('../models/User');

// get channels for a user
channelRouter.get('/list', async (req, res, next) => {
  try {
    const { userID } = req.body;
  } catch (err) {
    errm(err);
    next(err);
  }
});

// create a new channel
channelRouter.post('/new', async (req, res, next) => {
  try {
    const { channelName, userID } = req.body;

    // check if there is a user by this id
    const user = await User.findById(userID);

    if (user) {
      const channel = new Channel({
        name: channelName,
        users: [user.id],
      });
      const newChannel = await channel.save();

      user.channels = user.channels.concat(newChannel.id);

      const updatedUser = await user.save();

      info(updatedUser);
      info(newChannel);

      res.json(newChannel);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (err) {
    next(err);
  }
});

// join a channel
channelRouter.get('/link', async (req, res, next) => {
  try {
    const { channelID, userID } = req.body;
    const user = await User.findById();
  } catch (err) {
    next(err);
  }
});

// join a channel
channelRouter.put('/join', async (req, res, next) => {
  try {
    const { channelLink, userID } = req.body;
    info(channelLink);
  } catch (err) {
    next(err);
  }
});

// get initial messages
channelRouter.get('/messages', async (req, res, next) => {
  try {
    const { channelID } = req.body;
  } catch (err) {
    errm(err);
    next(err);
  }
});

// new messages to the server
channelRouter.post('/messages', async (req, res, next) => {
  try {
    const { channelID, userID, message } = req.body;
  } catch (err) {
    errm(err);
    next(err);
  }
});

module.exports = channelRouter;
