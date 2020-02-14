import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import FsLightbox from 'fslightbox-react';
import { mouseDownFunction } from '../Chat/Scripts/PopUpBoxScript';
import PhotoItem from './PhotoItem';
import '../../RightBar/Styling/DragAndDropBox.scss';
import '../../RightBar/Styling/PopUpBoxStyling.scss';

let socket;

export default function ImageBox({ channelId }) {
  socket = io('http://localhost:8001/');

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 0,
  });
  const [photos, setPhotos] = useState([]);

  // shows slide depending what photo it is
  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  const folderPath = `${channelId}`;
  useEffect(() => {
    fetch(`http://localhost:8001/api/photos/getChannelPhotos/${folderPath}`)
      .then((res) => res.json()).then((data) => data.resources)
      .then((allPhotos) => setPhotos(allPhotos)); // use this data, send it to the socket (new socket) then send it back here where you change the state of photos
  }, [folderPath]);

  // const folderPath = `${channelId}`;
  // useEffect(() => {
  //   fetch(`http://localhost:8001/api/photos/getChannelPhotos/${folderPath}`)
  //     .then((res) => res.json()).then((data) => data.resources)
  //     .then((allPhotos) => {
  //       // need help with this
  //       socket.emit('chat photos', allPhotos);
  //       socket.on('show photos', (chatPhotos) => setPhotos(chatPhotos));
  //     });
  // }, [folderPath]);

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

  // used for lightbox view
  const imageLinks = photos.map((image) => image.url);
  return (
    <div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={imageLinks}
        slide={lightboxController.slide}
        key={lightboxController.slide}
      />
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
    </div>
  );
}
