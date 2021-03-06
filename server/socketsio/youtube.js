const { errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');

module.exports = (io, socket) => {
  socket.on('connect to vid sync', () => {
  });

  socket.on('change video state', async ({
    url, paused, played, channel, authorization,
  }) => {
    try {
      const user = await extractJWT(authorization);
      if (user) {
        socket.to(channel).emit('new video state', {
          channel, url, paused, played,
        });
      }
    } catch (err) {
      errm(err);
    }
  });

  socket.on('change video time', async ({
    time, channel, authorization,
  }) => {
    try {
      const user = await extractJWT(authorization);
      if (user) {
        socket.to(channel).emit('new time stamp', {
          time, channel,
        });
      }
    } catch (err) {
      errm(err);
    }
  });
};
