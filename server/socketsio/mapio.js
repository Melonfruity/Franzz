const { errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');
const { updateLocations, updateChannel } = require('../utils/helpers/mapHelper');

// socket (client)
module.exports = (io, socket) => {
  // inititializing on load
  socket.on('update location', async ({ authorization, location }, callback) => {
    try {
      const user = await extractJWT(authorization);
      updateLocations(user.id, user.username, location, user.channels, callback, io);
    } catch (err) {
      errm(err);
    }
  });

  // for creating and joining a new channel
  socket.on('update maps', async ({ channel, authorization, location }) => {
    try {
      const user = await extractJWT(authorization);
      updateChannel(user.id, user.username, channel, location, io);
    } catch (err) {
      errm(err);
    }
  });
};
