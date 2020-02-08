const channelRouter = require('express').Router();
const passport = require('passport');
const { partOfChannel } = require('../utils/helpers/channelHelper');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');

// get channel and initial messages
channelRouter.get('/initialize',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // const messages = await Message.find({
      //   created: {
      //     $gte: new Date(new Date().setHours('00', '00', '00')),
      //     $lt: new Date(new Date().setHours('23', '59', '59')),
      //   },
      //   channel: channelID,
      // }).sort({ created: 'asc' });

      const { channels } = req.user;

      const messages = await Promise.all(
        channels.map(async (channel) => ({
          channel,
          messages: await Message
            .find({ channel })
            .sort({ created: 'desc' }),
        })),
      );
      res.json(messages);
    } catch (err) {
      next(err);
    }
  });

// create a new channel
channelRouter.post('/new',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { channelName } = req.body;
      const userID = req.user.id;
      // check if there is a user by this id

      const newChannel = new Channel({
        name: channelName,
        users: [userID],
      });

      // save the new channel to the db
      const savedChannel = await newChannel.save();

      // add the new channel id to the user channels array
      req.user.channels = req.user.channels.concat(savedChannel.id);

      // update that user
      await req.user.save();

      // send back the channel data, subjected to change
      res.json(savedChannel);
    } catch (err) {
      next(err);
    }
  });

// join a channel using channel id... should change that
channelRouter.put('/join/:channelID',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // link the relations if all things are valid
      const { channelID } = req.params;
      const userID = req.user.id;
      // these will throw an error if a find doesn't work
      const channel = await Channel.findById(channelID);

      // check if the user is already a part of the channel
      if (!partOfChannel(channel.users, userID)) {
        // save the new relations
        channel.users = channel.users.concat(userID);
        req.user.channels = req.user.channels.concat(channelID);

        await channel.save();
        await req.user.save();
      }
      res.status(200).json(channel);
    } catch (err) {
      next(err);
    }
  });

// new messages to the server
channelRouter.post('/messages',
  async (req, res, next) => {
    try {
      const { channelID, message, userID } = req.body;

      // new message object
      const newMessage = new Message({
        message,
        user: userID,
        channel: channelID,
      });

      await newMessage.save();
      res.json({ message: newMessage });
    } catch (err) {
      next(err);
    }
  });

module.exports = channelRouter;
