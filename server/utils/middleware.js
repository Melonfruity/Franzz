const { info, errm } = require('./logger');

const requestLogger = (req, res, next) => {
  info('Method:', req.method);
  info('Path:', req.path);
  info('Body:', req.body);
  info('---');
  next(); // call next middleware
};

// Don't need next because there'll be a error
const unknownEndpoint = (req, res) => {
  info(req);
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  errm(err.name, err.message);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      err: 'invalid token',
    });
  }
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
