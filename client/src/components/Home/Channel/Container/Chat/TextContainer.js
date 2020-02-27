/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { LinearProgress } from '@material-ui/core';
import Message from './Message';

import { serverURL } from '../../../../../utils/config';

import './TextContainer.css';

// Scripting work for adding photos to the cloud through the text container
import useChangeHighlightClass from '../../../../../hooks/useHighlightClass';
// import { preventDefaults, handleDrop } from '../../Modules/Photos/Scripts/DragAndDropPhotos';

const TextContainer = ({
  messages, deleteMessage, channelId, emitSendMessage, currentUser,
}) => {
  // Used to highlight the box when dragging photos in
  const { highlightClass, changeHighlightClass } = useChangeHighlightClass('');
  const [showProgress, toggleProgress] = useState(false);

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

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

  const handleDrop = (e, channelId, albumName, emitSendMessage) => {
    // get emitsendmessage to be passed through as a function
    preventDefaults(e);
    const dt = e.dataTransfer;
    const { files } = dt;

    handleFiles(files, channelId, albumName, emitSendMessage);
  };

  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      id={msg.id}
      message={msg.message}
      created={msg.created}
      username={msg.user.username}
      currentUser={currentUser}
      isCurrent={msg.user.id === currentUser}
      userId={msg.user.id}
      deleteMessage={deleteMessage}
      video={msg.video}
      image={msg.image}
    />
  ));

  // Changes the class depending on the event
  // and tracks event
  function boxEvent(e) {
    changeHighlightClass(e.type);
    preventDefaults(e);
  }

  function dropFile(e) {
    preventDefaults(e);
    toggleProgress(true);
    changeHighlightClass(e.type);
    handleDrop(e, channelId, 'chat', emitSendMessage);
    setTimeout(() => {
      toggleProgress(false);
    }, 2000);
  }


  return (
    <div
      onDragEnter={boxEvent}
      onDragLeave={boxEvent}
      onDragOver={boxEvent}
      onDrop={dropFile}
    >
      <ScrollToBottom
        id="drop-area"
        className={`textContainer ${highlightClass}`}
      >
        {formattedMessages}
      </ScrollToBottom>
      {showProgress && <LinearProgress />}
    </div>
  );
};

export default TextContainer;
