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
          console.log(location);
          const locationObj = {
            location,
            authorization: state.authorization,
          };
          socket.emit('update maps', locationObj);
          // socket.emit('update location', locationObj, (locations) => {
          //   setState((prev) => ({
          //     ...prev,
          //     locations,
          //     center: location,
          //   }));
          // });
        });
      }
    }
  };
  const GOOGLE_API_KEY = 'AIzaSyBri0PKsTN8-kTlzAROVisAsALmAryij_A';

  const intializeMapsData = () => {
    console.log('updated on state change');
    if (socket) {
      axios
        // .get(`http://ipinfo.io?token=${token}`)
        .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`)
        .then((res) => {
          // const loc = res.data.loc.split(',');
          // const location = {
          //   lat: Number(loc[0]),
          //   lng: Number(loc[1]),
          // };
          console.log(res.data);
          const { location } = res.data;
          const locationObj = {
            // location: { lat: 43.8288856, lng: -79.2946161 },
            location,
            authorization: state.authorization,
          };
          socket.emit('update location', locationObj, (locations) => {
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
