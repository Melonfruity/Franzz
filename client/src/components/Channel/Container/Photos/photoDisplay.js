import React, { useState, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';
import { mouseDownFunction } from '../Chat/Scripts/PopUpBoxScript';
import PhotoItem from './PhotoItem';
import '../../RightBar/Styling/DragAndDropBox.scss';
import '../../RightBar/Styling/PopUpBoxStyling.scss';
import NewAlbumForm from './newAlbumForm';
import GalleryDisplay from './galleryDisplay';

const CHAT = 'chat';
const ALBUMS = 'albums';
const ALBUMFORM = 'albumForm';
export default function ImageBox({ channelId, emitSendMessage }) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 0,
  });
  const [photos, setPhotos] = useState([]);
  const [view, changeView] = useState('chat');

  // Changes view of gallery
  function newView(v) {
    changeView(v);
  }

  // shows slide depending what photo it is
  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  // Gets photos from chat
  const folderPath = `${channelId}`;
  useEffect(() => {
    fetch(`http://localhost:8001/api/photos/getChannelPhotos/${folderPath}`)
      .then((res) => res.json()).then((data) => data.resources)
      .then((allPhotos) => setPhotos(allPhotos));
  }, [folderPath]);

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
          { view === ALBUMFORM && <NewAlbumForm cancel={newView} channelId={channelId} emitSendMessage={emitSendMessage}/>}
          { view === CHAT && <GalleryDisplay change={newView} content={allImages} />}
        </div>
      </div>
    </div>
  );
}
