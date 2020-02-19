import React, { useState, useEffect } from 'react';
import './Styling/galleryStyling.css';
import PhotoItem from './PhotoItem';


export default function GalleryDisplay({
  path, title, isAlbum, addPhotos, openLightboxOnSlide, changeLinks,
}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    console.log(path)
    fetch(`http://localhost:8001/api/photos/getChannelPhotos/${path}`)
      .then((res) => res.json())
      .then((data) => data.resources)
      .then((allPhotos) => { console.log('allPhotos:', allPhotos); setPhotos(allPhotos); });
  }, [path]);


  const allImages = [];
  let slide = 0;
  photos.forEach((img) => {
    slide += 1;
    allImages.push(
      <PhotoItem
        key={img.public_id}
        publicKey={img.public_id}
        url={img.url}
        fileType={img.resource_type}
        showSlide={openLightboxOnSlide}
        slide={slide}
      />,
    );
  });


  // formats the images for the grid
  const images = [[], [], [], []];
  let column = 0;
  allImages.forEach((image) => {
    images[column].push(image);
    if (column === 3) {
      column = 0;
    } else {
      column += 1;
    }
  });

  useEffect(() => {
    const imageLinks = photos.map((image) => image.url);
    changeLinks(imageLinks);
  }, [changeLinks, photos]);

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
