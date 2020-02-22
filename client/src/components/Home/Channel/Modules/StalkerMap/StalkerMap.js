import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import '../Photos/Styling/PopUpBoxStyling.css';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const markerStyle = {
  height: '40px',
  width: '40px',
  marginTop: '-50px',
};

const imgStyle = {
  height: '100%',
};

const containerStyle = {
  width: '77.5%',
  height: '663px',
  position: 'absolute',
};

const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
    <p className="googleMapsMarkerLabel">{title}</p>
  </div>
);

const StalkerMap = ({ locations, center, channel }) => {
  useEffect(() => {

  }, [locations]);
  const locationMarkers = locations ? locations.map((user) => (
    <Marker
      className="googleMapsMarker"
      key={`${channel}${Math.random() * 10}`}
      title={`${user.username}`}
      lat={user.location.lat}
      lng={user.location.lng}
    />
  )) : <Marker title="default location" {...center} />;

  return (
    <div className="resize-box" onMouseDown={mouseDownFunction}>
      <GoogleMap
        style={{mapStyles}}
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
