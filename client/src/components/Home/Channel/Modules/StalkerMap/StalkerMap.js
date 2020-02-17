import React from 'react';
import GoogleMap from 'google-map-react';

const mapStyles = {
  width: '100%',
  height: '100%',
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

const StalkerMap = () => (
  <div>
    <GoogleMap
      style={mapStyles}
      bootstrapURLKeys={{ key: 'AIzaSyBri0PKsTN8-kTlzAROVisAsALmAryij_A' }}
      center={{ lat: 5.6219868, lng: -0.1733074 }}
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

export default StalkerMap;
