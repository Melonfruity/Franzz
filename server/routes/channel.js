const channelRouter = require('express').Router();
const passport = require('passport');
const { createInviteLink, getChannel, partOfChannel } = require('../utils/helpers/channelHelper');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');

// get channel and initial messages
channelRouter.get('/initialize',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { channels } = req.user;

      const channelData = await Promise.all(
        channels.map(async (channel) => ({
          data: await Channel
            .findById(channel)
            .then((data) => ({
              users: data.users,
              channel: data.id,
              name: data.name,
            })),
          messages: await Message
            .find({ channel })
            .populate('user')
            .sort({ created: 'asc' }),
        })),
      );
      res.json({ channelData });
    } catch (err) {
      next(err);
    }
  });

channelRouter.get('/invite/:channelID',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { channelID } = req.params;
      res.json({ channelID: createInviteLink(channelID) });
    } catch (err) {
      next(err);
    }
  });

// join a channel using channel id... should change that
channelRouter.put('/join',
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

module.exports = channelRouter;
