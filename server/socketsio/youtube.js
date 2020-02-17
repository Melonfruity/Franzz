const { info, errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');
const { partOfChannel, getChannel } = require('../utils/helpers/channelHelper');
const Channel = require('../models/Channel');

module.exports = (io, socket) => {
  socket.on('connect to vid sync', () => {
    info('connecting to vid sync');
  });
};
