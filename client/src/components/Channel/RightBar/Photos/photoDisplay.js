import React, { useState, useEffect } from 'react';
import { mouseDownFunction } from '../../Container/Chat/Scripts/PopUpBoxScript';
import PhotoItem from './PhotoItem';

export default function ImageBox({ channelId }) {
  const [photos, setPhotos] = useState([]);

  const folderPath = `${channelId}`;
  useEffect(() => {
    fetch(`http://localhost:8001/api/photos/getChannelPhotos/${folderPath}`)
      .then((res) => res.json()).then((data) => data.resources)
      .then((allPhotos) => setPhotos(allPhotos)); // use this data, send it to the socket (new socket) then send it back here where you change the state of photos
  }, [folderPath]);


  const allImages = photos.map((img) => (
    <PhotoItem
      key={img.public_id}
      publicKey={img.public_id}
      url={img.url}
      fileType={img.resource_type}
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
        <h4>Chat Images</h4>
        <button>New Album</button>
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
