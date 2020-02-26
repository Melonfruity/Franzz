import axios from 'axios';

import { GOOGLE_API_KEY } from '../utils/config';

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
