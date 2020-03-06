/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';
import AlbumForm from './AlbumForm';
import GalleryDisplay from './galleryDisplay';
import AlbumDisplay from './AlbumDisplay';
import './Styling/PopUpBoxStyling.css';
import './Styling/imageBox.css';

const CHAT = 'chat';
const ALBUMS = 'albums';
const ALBUMFORM = 'albumForm';
const ALBUMPHOTOS = 'albumPhotos';
const ADDALBUMPHOTOS = 'addAlbumPhotos';

export default function ImageBox({ channelId, emitSendMessage }) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 0,
  });
  const [imageLinks, changeLinks] = useState([]);
  const [view, changeView] = useState('chat');
  const [folderPath, changePath] = useState(`${channelId}/chat/false`);
  const [title, changeTitle] = useState('Chat Photos');

  // Changes view of gallery
  function newView(v) {
    changeView(v);
  }

  // Changes to view media in an album
  function viewAlbum(albumPath, name) {
    changePath(albumPath);
    changeTitle(name);
    newView('albumPhotos');
  }

  // Go back to viewing chat photos
  function viewChatPhotos() {
    changePath(`${channelId}/chat/false`);
    changeTitle('Chat Photos');
    changeView('chat');
  }

  // shows slide depending what photo it is
  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={imageLinks}
        slide={lightboxController.slide}
        key={lightboxController.slide}
      />
      <div className="resize-box" onMouseDown={mouseDownFunction}>
        <div id="imageBox">
          <div className="switch-buttons">
            <button type="button" className="image-buttons" onClick={() => viewChatPhotos()}>CHAT</button>
            <button type="button" className="image-buttons" onClick={() => newView('albums')}>ALBUMS</button>
          </div>
          { view === ALBUMFORM
          && (
          <AlbumForm
            channelId={channelId}
            emitSendMessage={emitSendMessage}
            albumName=""
            newAlbum
            viewAlbum={newView}
          />
          )}
          { view === CHAT
          && (
          <GalleryDisplay
            path={folderPath}
            title={title}
            isAlbum={false}
            openLightboxOnSlide={openLightboxOnSlide}
            addPhotos={newView}
            changeLinks={changeLinks}
          />
          )}
          { view === ALBUMS
          && (
          <AlbumDisplay
            change={newView}
            channelId={channelId}
            viewAlbum={viewAlbum}
          />
          )}
          {view === ALBUMPHOTOS
          && (
          <GalleryDisplay
            path={folderPath}
            title={title}
            isAlbum
            openLightboxOnSlide={openLightboxOnSlide}
            addPhotos={newView}
            changeLinks={changeLinks}
          />
          )}
          {view === ADDALBUMPHOTOS && (
          <AlbumForm
            channelId={channelId}
            emitSendMessage={emitSendMessage}
            albumName={title}
            newAlbum={false}
            viewAlbum={viewAlbum}
          />
          )}
        </div>
      </div>
    </div>
  );
}
