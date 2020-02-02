const channelRouter = require('express').Router();
const { info, errm } = require('../utils/logger');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');

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
    const { name, userID } = req.body;

    const channel = new Channel({
      name,
      users: [userID],
    });

    const newChannel = await channel.save();
    info(newChannel);
  } catch (err) {
    next(err);
  }
});

// join a channel
channelRouter.get('/link', async (req, res, next) => {
  try {
    const { channelID } = req.body;
    info(channelID);
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
