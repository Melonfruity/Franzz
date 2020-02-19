const shortLinks = {};
const locations = {};
const status = {};

// status = {
//   socketID: [channels],
// };

// locations = {
//   [channelID]: {
//     [socketID]: {
//       username,
//       location,
//     },
//     [socketID]: {
//       username,
//       location,
//     },
//   },
//   [channelID]: {
//     [socketID]: {
//       username,
//       location,
//     }
//   }
// }


const changeOnline = (id, channels, username, socket) => {
  if (!status[id]) status[id] = { channels, username };
  // socket.emit('user online');
};
const changeOffline = (id, io) => {
  const { channels, username } = status[id];
  // if online
  if (channels) {
    channels.forEach((channel) => {
      io.in(channel).emit('user offline', { username }, () => {
        delete locations[channel][id];
      });
    });
  }
};

module.exports = {
  locations,
  shortLinks,
  changeOnline,
  changeOffline,
};
