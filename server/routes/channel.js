const channelRouter = require('express').Router();
const { info, err } = require('../utils/logger');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');

// get channels for a user
channelRouter.get('/list', (req, res, next) => {

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
channelRouter.put('/join', (req, res, next) => {
  
});

// get initial messages
channelRouter.get('/messages', (req, res, next) => {
  
});

// new messages to the server
channelRouter.post('/messages', (req, res, next) => {
  
});

module.exports = channelRouter;
