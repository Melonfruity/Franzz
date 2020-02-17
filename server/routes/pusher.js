const pusherRouter = require('express').Router();

module.exports = (pusher) => {
  pusherRouter.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const presenceData = {
      user_id: randomString,
      user_info: {
        username: `@${randomString}`,
      },
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
  });

  pusherRouter.post('/update-location', (req, res) => {
    // trigger a new post event via pusher
    pusher.trigger('presence-channel', 'location-update', {
      username: req.body.username,
      location: req.body.location,
    });
    res.json({ status: 200 });
  });

  return pusherRouter;
};
