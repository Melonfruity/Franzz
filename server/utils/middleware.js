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
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  errm(err.name, err.message);
  // need to fill in types of errors
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
