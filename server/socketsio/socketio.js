const { info, errm } = require('../utils/logger');
const channelio = require('./channelio');
const youtubeio = require('./youtube');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // server
    socket.emit('server message', {
      serverMsg: 'connected to server',
    });

    channelio(io, socket);
    youtubeio(io, socket);

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
