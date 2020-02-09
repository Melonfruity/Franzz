import React, { useState, useEffect } from 'react';
import { mouseDownFunction } from '../Chat/Scripts/PopUpBoxScript';
import '../Chat/Styling/PopUpBoxStyling.scss';
import PhotoItem from './PhotoItem';
import '../Chat/Styling/galleryStyling.scss';

export default function ImageBox(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/api/photos/getChannelPhotos')
      .then((res) => res.json()).then((data) => data.resources)
      .then((allPhotos) => setPhotos(allPhotos));
  }, []);

  const allImages = photos.map((img) => (
    <PhotoItem
      key={img.public_id}
      url={img.url}
    />
  ));

  return (
    <div id="resize-box" onMouseDown={mouseDownFunction}>
      <div id="imageBox">
        {allImages}
      </div>
    </div>
  );
}
