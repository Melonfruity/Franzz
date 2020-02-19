// eslint-disable-next-line import/prefer-default-export
export const useMap = (state, setState, socket) => {
  // initialization
  const intializeMapsData = () => {
    console.log('updated on state change');
    if (socket) {
      const getLocation = () => {
        if (navigator.geolocation) {
          console.log('getting location data');
          navigator.geolocation.watchPosition((position) => {
            const location = { lat: position.coords.latitude, lng: position.coords.longitude };
            const locationObj = {
              location,
              authorization: state.authorization,
            };
            socket.emit('update location', locationObj, (locations) => {
              console.log('update location emit');
              console.log(locations);
              setState((prev) => ({
                ...prev,
                locations,
                center: location,
              }));
            });
          });
        }
      };
      getLocation();
    }
  };

  const updateMaps = (channel) => {
    socket.emit('update maps', { channel });
  };

  const grabLocations = (channel) => {
    return state.locations[channel];
  };

  return {
    grabLocations,
    intializeMapsData,
    updateMaps,
  };
};
