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

  const images = [[], [], [], []];
  let column = 0;
  for (const image of allImages) {
    images[column].push(image);
    if (column === 3) {
      column = 0;
    } else {
      column += 1;
    }
  }

  return (
    <div id="resize-box" onMouseDown={mouseDownFunction}>
      <div id="imageBox">
        <div className="row">
          <div className="column">
            {images[0]}
          </div>
          <div className="column">
            {images[1]}
          </div>
          <div className="column">
            {images[2]}
          </div>
          <div className="column">
            {images[3]}
          </div>
        </div>
      </div>
    </div>
  );
}
