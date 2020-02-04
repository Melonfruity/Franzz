const { info } = require('../utils/logger');

module.exports = (io) => {
  const channel = io.of('/channel');

  channel.on('connection', (socket) => {
    // server
    channel.emit('server message', {
      serverMsg: 'connected to server',
    });

    // socket (client)
    socket.on('message', (data) => {
      info(data);
    });

    // namespace is channel but room is going to be called channel
    socket.on('join channel', (roomData) => {
      info(roomData);
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
