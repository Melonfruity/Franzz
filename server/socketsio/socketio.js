const { info } = require('../utils/logger');
const channelio = require('./channelio');
const youtubeio = require('./youtube');
const mapio = require('./mapio');
const { changeOffline } = require('../dynamicDB');

module.exports = (io) => {
  io.on('connection', (socket) => {
    info('client connected');
    // server
    socket.emit('server message', {
      serverMsg: 'connected to server',
    });

    channelio(io, socket);
    youtubeio(io, socket);
    mapio(io, socket);

    socket.on('disconnect', () => {
      info('client disconnected');
      changeOffline(socket.id, io);
    });
  });
};
