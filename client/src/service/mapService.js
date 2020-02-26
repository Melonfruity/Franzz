import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyBri0PKsTN8-kTlzAROVisAsALmAryij_A';

const getLocation = async (updateLocation) => {
  axios
    .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`)
    .then((res) => {
      const { location } = res.data;
      updateLocation(location);
    });
};

export default {
  getLocation,
};
