const _ = require('lodash');

const shortLinks = {};
const locations = {};
const status = {};
const socketReference = {};

// status = {
//   [channel]: { [socketID]: username },
//   [channel]: {
//      [userID]: {
//          username,
//          sockets: [socketIDs]
//      },
//      [userID]: {
//          username,
//          sockets: [socketIDs]
//      }
//   },
// };

// locations = {
//   [channel]: {
//     [userID]: {
//       username,
//       location,
//     },
//     [userID]: {
//       username,
//       location,
//     },
//   },
//   [channel]: {
//     [userID]: {
//       username,
//       location,
//     }
//   }
// }

// socketReference = {
//   [socketID]: {userID, channel}
// }

const changeOnline = (socketID, user, channels, username, io) => {
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
    const userStatus = {
      channel,
      users:
        Object.values(status[channel])
          // eslint-disable-next-line no-shadow
          .map(({ username, sockets }) => ({ username, online: !_.isEmpty(sockets) })),
    };
    // should emit a new array of new status for each of the users channels
    io.in(channel).emit('user status', { userStatus });

    // update maps when user goes offline and only if they use maps
    if (locations[channel] && locations[channel][socketID]) {
      delete locations[channel][socketID];
      const locationObj = {
        channel,
        newLocations: [...Object.values(locations[channel])],
      };
      // console.log('offline update maps', channel, locationObj);
      io.in(channel).emit('update location', locationObj);
    }
  }
};

module.exports = {
  locations,
  shortLinks,
  changeOnline,
  changeOffline,
};
