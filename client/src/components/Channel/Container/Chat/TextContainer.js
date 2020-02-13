/* eslint-disable react/prop-types */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

import './TextContainer.css';

// Scripting work for adding photos to the cloud through the text container
import useChangeHighlightClass from '../../../../hooks/useHighlightClass';
import { preventDefaults, handleDrop, handleFiles } from './Scripts/DragAndDropPhotos';

const TextContainer = ({ messages, deleteMessage, channelId }) => {

  // Used to highlight the box when dragging photos in
  const { highlightClass, changeHighlightClass } = useChangeHighlightClass('');

  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      id={msg.id}
      message={msg.message}
      created={msg.created}
      username={msg.user.username}
      deleteMessage={deleteMessage}
    />
  ));

  // Changes the class depending on the event
  // and tracks event
  function boxEvent(e) {
    changeHighlightClass(e.type);
    preventDefaults(e);
  }

  function dropFile(e) {
    changeHighlightClass(e.type);
    handleDrop(e, channelId);
  }

  return (
    <div
      id="drop-area"
      className={`textContainer ${highlightClass}`}
      onDragEnter={boxEvent}
      onDragLeave={boxEvent}
      onDragOver={boxEvent}
      onDrop={dropFile}
    >
      <ScrollToBottom class="messages">
        {formattedMessages}
      </ScrollToBottom>
    </div>
  );
};

export default TextContainer;
