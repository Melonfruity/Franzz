const pusherRouter = require('express').Router();

module.exports = (pusher) => {
  pusherRouter.post('/paint', (req, res) => {
    console.log(req.body.channel)
    pusher.trigger('painting', 'draw', req.body);
    res.json(req.body);
  });
  return pusherRouter;
};
