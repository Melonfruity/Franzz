const rootRouter = require('express').Router();

rootRouter.get('/', (req, res) => {
  res.send('Connected to JEK backend');
});

module.exports = rootRouter;
