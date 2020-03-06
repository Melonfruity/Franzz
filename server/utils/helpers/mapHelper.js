const { locations } = require('../../dynamicDB');

const updateLocations = (user, username, location, channels, callback, io) => {
  // update the locations for each of the users channels
  channels.forEach((channel) => {
    if (!locations[channel]) {
      locations[channel] = {};
    }
    locations[channel] = {
      ...locations[channel],
      [user]: {
        id: user,
        username,
        location,
      },
    };
    const locationsObj = {
      [channel]: [...Object.values(locations[channel])],
    };
    io.in(channel).emit('update location', locationsObj);
  });

  const appLocations = channels.reduce((prev, channel) => {
    const reducedChannel = { ...prev };
    reducedChannel[channel] = [...Object.values(locations[channel])];
    return reducedChannel;
  }, {});
  callback(appLocations);
};

// change id to socket ID
const updateChannel = (user, username, channel, location, io) => {
  if (!locations[channel]) {
    locations[channel] = {};
  }
  locations[channel] = {
    ...locations[channel],
    [user]: {
      id: user,
      username,
      location,
    },
  };
  const locationObj = {
    [channel]: [...Object.values(locations[channel])],
  };
  io.in(channel).emit('update location', locationObj);
};

module.exports = {
  updateLocations,
  updateChannel,
};
