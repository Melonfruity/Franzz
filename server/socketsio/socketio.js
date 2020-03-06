const { info } = require('../utils/logger');
const channelio = require('./channelio');
const youtubeio = require('./youtube');
const mapio = require('./mapio');
const drawingio = require('./drawingio');
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
    drawingio(io, socket);

    socket.on('test', (data) => {
      console.log(data);
    });

    socket.on('disconnect', () => {
      info('client disconnected');
      changeOffline(socket.id, io);
    });
  });
};
