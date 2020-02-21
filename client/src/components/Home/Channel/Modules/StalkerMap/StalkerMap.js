import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-50px',
};

const imgStyle = {
  height: '100%',
};

const containerStyle = {
  width: '1000px',
  height: '600px',
};

const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

const StalkerMap = ({ locations, center, channel }) => {
  useEffect(() => {

  }, [locations]);
  const locationMarkers = locations ? locations.map((user) => (
    <Marker
      key={`${channel}${Math.random() * 10}`}
      title={`${user.username}'s location`}
      lat={user.location.lat}
      lng={user.location.lng}
    />
  )) : <Marker title="default location" {...center} />;

  return (
    <div style={containerStyle}>
      <GoogleMap
        style={mapStyles}
        bootstrapURLKeys={{ key: 'AIzaSyBri0PKsTN8-kTlzAROVisAsALmAryij_A' }}
        center={center}
        zoom={14}
      >
        {locationMarkers}
      </GoogleMap>
    </div>
  );
};

export default StalkerMap;
