// const { extractJWT } = require('../utils/helpers/authHelper');

// socket (client)
module.exports = (io, socket) => {
  // sending an array of lines
  socket.on('draw', async ({ user, channel, line }) => {
    try {
      socket.to(channel).emit('draw', { user, channel, line });
    } catch (err) {
      console.log(err);
    }
  });
};
