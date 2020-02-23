const shortLinks = {};
const locations = {};
const status = {};

// status = {
//   [channel]: { [socketID]: username },
//   [channel]: {
//      [socketID]: username,
//      [socketID]: username,
//      [socketID]: username,
//      [socketID]: username,
//   },
// };

// locations = {
//   [channel]: {
//     [socketID]: {
//       username,
//       location,
//     },
//     [socketID]: {
//       username,
//       location,
//     },
//   },
//   [channel]: {
//     [socketID]: {
//       username,
//       location,
//     }
//   }
// }


const changeOnline = (socketID, channels, username, io) => {
  console.log('socketID', socketID, username);
  channels.forEach((channel) => {
    if (!status[channel]) {
      status[channel] = { [socketID]: { username } };
    } else {
      status[channel][socketID] = { username };
    }
    const userStatus = {
      channel,
      users: Object.values(status[channel]),
    };
    console.log('online', channel, userStatus);
    io.in(channel).emit('user status', { userStatus });
  });
};


const changeOffline = (socketID, io) => {
  const channels = Object.keys(status);
  channels.forEach((channel) => {
    const user = status[channel][socketID];
    if (user) {
      delete status[channel][socketID];
      const userStatus = {
        channel,
        users: Object.values(status[channel]),
      };
      // should emit a new array of new status for each of the users channels
      console.log('offline', channel, userStatus);
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
  });
};

module.exports = {
  locations,
  shortLinks,
  changeOnline,
  changeOffline,
};
