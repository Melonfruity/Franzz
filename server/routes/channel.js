const channelRouter = require('express').Router();
const passport = require('passport');
const { createInviteLink } = require('../utils/helpers/channelHelper');

// Models
const Channel = require('../models/Channel');
const Message = require('../models/Message');

// get channel and initial messages
channelRouter.get('/initialize',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { channels } = req.user;
      console.log(req.user)
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

module.exports = channelRouter;
