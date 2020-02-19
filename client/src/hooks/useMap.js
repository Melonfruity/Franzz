import axios from 'axios';

const token = '0aaae0c0080e60';

// eslint-disable-next-line import/prefer-default-export
export const useMap = (state, setState, socket) => {
  // initialization
  const getLocation = () => {
    if (socket) {
      if (navigator.geolocation) {
        console.log('getting location data');
        navigator.geolocation.watchPosition((position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          const locationObj = {
            location,
            authorization: state.authorization,
          };
          console.log(location);
          socket.emit('update maps', locationObj);
        });
      }
    }
  };

  const intializeMapsData = () => {
    console.log('updated on state change');
    if (socket) {
      axios
        .get(`http://ipinfo.io?token=${token}`)
        .then((res) => {
          const loc = res.data.loc.split(',');
          const location = {
            lat: Number(loc[0]),
            lng: Number(loc[1]),
          };
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
      getLocation();
    }
  };

  const grabLocations = (channel) => {
    return state.locations[channel];
  };

  return {
    grabLocations,
    intializeMapsData,
  };
};
