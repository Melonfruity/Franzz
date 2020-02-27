const _ = require('lodash');

const shortLinks = {};
const locations = {};
const status = {};
const socketReference = {};
const channelReference = {};

const changeOnline = (socketID, user, channels, username, io) => {
  channelReference[user] = channels;
  channels.forEach((channel) => {
    // to check when offline
    socketReference[socketID] = {
      user,
      channel,
    };
    // check if the channel exists, if not then the first user is added to the channel
    if (!status[channel]) {
      status[channel] = {
        [user]: {
          id: user,
          username,
          sockets: [socketID],
        },
      };
    } else {
      // the channel exists and the user exists
      status[channel] = {
        ...status[channel],
        [user]: {
          id: user,
          username,
          sockets: !status[channel][user]
            ? [socketID]
            : status[channel][user].sockets.concat(socketID),
        },
      };
    }

    // if their socket array is not empty then they are online
    const userStatus = {
      channel,
      users:
        Object.values(status[channel])
          // eslint-disable-next-line no-shadow
          .map(({ username, sockets, id }) => ({ id, username, online: !_.isEmpty(sockets) })),
    };
    io.in(channel).emit('user status', { userStatus });
  });
};

const changeOffline = (socketID, io) => {
  if (socketReference[socketID]) {
    const { channel, user } = socketReference[socketID];
    status[channel][user] = {
      ...status[channel][user],
      sockets: status[channel][user].sockets.filter((id) => id !== socketID),
    };
    const socketsAvailable = _.isEmpty(status[channel][user].sockets);
    // if it is empty then that means they are not online
    if (socketsAvailable) {
      const userStatus = {
        channel,
        users:
          Object.values(status[channel])
            // eslint-disable-next-line no-shadow
            .map(({ username, sockets, id }) => ({ id, username, online: !_.isEmpty(sockets) })),
      };

      // should emit a new array of new status for each of the users channels
      io.in(channel).emit('user status', { userStatus });

      // also update the locations for each of the channels the user is a part of
      channelReference[user].forEach((channelID) => {
        if (locations[channelID]) {
          delete locations[channelID][user];
          const locationObj = {
            [channelID]: [...Object.values(locations[channelID])],
          };
          io.in(channelID).emit('update location', locationObj);
        }
      });
      delete socketReference[socketID];
    }
  }
};

module.exports = {
  locations,
  shortLinks,
  changeOnline,
  changeOffline,
};
