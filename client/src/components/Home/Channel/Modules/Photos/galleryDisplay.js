import React from 'react';
import './Styling/galleryStyling.css';

export default function GalleryDisplay({ content, title, isAlbum, addPhotos }) {
  // formats the images for the grid
  const images = [[], [], [], []];
  let column = 0;
  content.forEach((image) => {
    images[column].push(image);
    if (column === 3) {
      column = 0;
    } else {
      column += 1;
    }
  });

  return (
    <div>
      <h4>{title}</h4>
      {isAlbum && <button onClick={() => addPhotos('addAlbumPhotos')}>Add Photos</button>}
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
  );
}
