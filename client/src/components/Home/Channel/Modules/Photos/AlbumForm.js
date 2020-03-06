import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
// import { handleFiles } from './Scripts/DragAndDropPhotos';

import { serverURL } from '../../../../../utils/config';

export default function AlbumForm({
  channelId, emitSendMessage, albumName, newAlbum, viewAlbum,
}) {
  const [fields, changeFields] = useState(
    {
      album: albumName,
      files: [],
      originalName: albumName,
    },
  );
  const [showProgress, toggleProgress] = useState(false);

  const uploadFile = async (file, channelId, albumName, emitSendMessage, viewUpdatedAlbum) => {
    const url = `${serverURL}/api/photos/uploadPhotos`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('channel', `${channelId}`);
    let path = `albums/${albumName.replace(/ /g, '-')}`;
    if (albumName === 'chat') {
      path = 'chat';
    }
    formData.append('album', path);


    fetch(url, {
      method: 'POST',
      body: formData,
    })
      // send the url of image/video to socket to be used for messaging
      .then((res) => res.json())
      .then((data) => {
        if (albumName === 'chat') {
          emitSendMessage(data.result.url, data.video, data.image);
        } else {
          setTimeout(() => {
            viewUpdatedAlbum();
          }, 3000);
        }
      })
      .catch((err) => { console.log(err); });
  };

  const handleFiles = (files, channelId, albumName, emitSendMessage, viewUpdatedAlbum) => {
    [...files].forEach((file) => {
      uploadFile(file, channelId, albumName, emitSendMessage, viewUpdatedAlbum);
    });
  };


  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      if (file.type === 'video/mp4') {
        img = document.createElement('video');
      }
      img.src = reader.result;
      document.getElementById('input-display').appendChild(img);
    };
  }

  // Handles form events when adding files and
  // creating a name
  function handleOnChange(event) {
    event.preventDefault();
    if (event.target.name === 'album') {
      const value = event.target.value.replace(/ /g, '-');
      changeFields({
        ...fields,
        [event.target.name]: value,
        originalName: event.target.value,
      });
    } else {
      [...event.target.files].forEach(previewFile);
      changeFields({
        album: fields.album,
        files: [...fields.files, event.target.files],
      });
    }
  }

  function viewUpdatedAlbum() {
    const pathName = albumName.replace(/ /g, '-');
    console.log(pathName);
    viewAlbum(`${channelId}/albums/${pathName}`, albumName);
  }

  function viewAlbums() {
    viewAlbum('albums');
  }

  async function handleSubmit(event) {
    toggleProgress(true);
    event.preventDefault();
    [...fields.files].forEach((file) => {
      if (!newAlbum) {
        handleFiles(file, channelId, fields.album, emitSendMessage, viewUpdatedAlbum);
      } else {
        handleFiles(file, channelId, fields.album, emitSendMessage, viewAlbums);
      }
      setTimeout(() => {
        toggleProgress(false);
      }, 3000);
    });
    document.getElementById('album-upload-form').reset();
    let message = `🚨A new album '${fields.album.replace(/-/g, ' ')}' has been uploaded🚨`;
    if (!newAlbum) {
      message = `👀 New photos were added to ${fields.album}`;
    } else {
      setTimeout(() => viewAlbum('albums'), 3000);
    }
    setTimeout(() => emitSendMessage(message, false, false), 3000);
  }

  return (
    <div>
      { showProgress && <LinearProgress /> }
      { newAlbum && <div className="popup-title">New Album</div> }
      { !newAlbum && (
      <div className="popup-title-mod">
        Adding photos to
        {' '}
        {albumName}
      </div>
      )}
      <form id="album-upload-form" onSubmit={handleSubmit}>
        { newAlbum && (
          <input id="input-album" type="text" name="album" placeholder="Choose an album name" onChange={handleOnChange} />
        )}
        <div id="album-submission"><input className="submit-button" type="submit" value="SUBMIT" /></div>
        <div id="input-display" value="drag">
          <input
            id="album-upload"
            name="files"
            type="file"
            multiple
            accept="image/*"
            onChange={handleOnChange}
          />
          <div className="subtitle">ADDED MEDIA:</div>
        </div>
      </form>
    </div>
  );
}
