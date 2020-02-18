const locations = {};

const updateLocations = (id, username, location, channels, callback, io) => {
  channels.forEach((channel) => {
    if (!locations[channel]) {
      locations[channel] = {};
    }
    locations[channel][id] = {
      username,
      location,
    };
  });

  channels.forEach((channel) => {
    const locationsObj = {
      channel,
      newLocations: [...Object.values(locations[channel])],
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

module.exports = {
  updateLocations,
};
