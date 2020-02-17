import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import Pusher from 'pusher-js';
import axios from 'axios';

const mapStyles = {
  width: '25%',
  height: '25%',
};

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-50px',
};

const imgStyle = {
  height: '100%',
};


const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

const StalkerMap = () => {
  const [state, setState] = useState({
    currentUser: window.localStorage.getItem('username'),
    location: {},
    locations: {},
  });

  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
          const location = { lat: position.coords.latitude, lng: position.coords.longitude };
          setState((prevState) => {
            const newState = { ...prevState };
            newState.location = location;
            newState.locations[`${prevState.currentUser}`] = location;
            return newState;
          });
          axios.post('http://localhost:8001/api/pusher/update-location', {
            username: state.currentUser,
            location,
          }).then((res) => {
            if (res.status === 200) {
              console.log('new location updated successfully');
            }
          });
        });
      } else {
        console.log('Sorry, geolocation is not available on your device. You need that to use this app');
      }
    };

    const pusher = new Pusher('0609165026115fbd973a', {
      authEndpoint: 'http://localhost:8001/api/pusher/auth',
      cluster: 'mt1',
      forceTLS: true,
    });
    const presenceChannel = pusher.subscribe('presence-channel');
    presenceChannel.bind('pusher:subscription_succeeded', (members) => {
      console.log(members);
      getLocation();
    });
    const presenceChannel2 = pusher.subscribe('presence-channel2');
    presenceChannel2.bind('pusher:subscription_succeeded', (members) => {
      console.log(members);
      getLocation();
    });
  }, []);

  return (
    <div>
      <GoogleMap
        style={mapStyles}
        bootstrapURLKeys={{ key: 'AIzaSyBri0PKsTN8-kTlzAROVisAsALmAryij_A' }}
        location={{ lat: 5.6219868, lng: -0.1733074 }}
        zoom={14}
      >
        <Marker
          title="Current Location"
          lat={5.6219868}
          lng={-0.1733074}
        />
      </GoogleMap>
    </div>
  );
};

export default StalkerMap;
