const { info } = require('../utils/logger');

module.exports = (io) => {
  const channel = io.of('/channel');

  channel.on('connection', (socket) => {
    // server
    channel.emit('serverMsg', {
      serverMsg: 'connected to server',
    });

    // socket (client)
    socket.on('message', (data) => {
      info(data);
    });

    socket.on('joinRoom', (roomData) => {
      info(roomData);
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
