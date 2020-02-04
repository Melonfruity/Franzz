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

    // namespace is channel and room will be called channel
    socket.on('join channel', (channelData) => {
      info(channelData);
      
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
