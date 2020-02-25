/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { handleFiles } from '../../Modules/Photos/Scripts/DragAndDropPhotos';

const Input = ({
  message, setMessage, emitSendMessage, channel, setShowEmojiPicker,
}) => {
  const [showProgress, toggleProgress] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    toggleProgress(true);
    emitSendMessage(message);
    toggleProgress(false);
    setMessage('');
  };

  const sendFileMessage = (e) => {
    toggleProgress(true);
    handleFiles(e.target.files, channel, 'chat', emitSendMessage);
    setTimeout(() => {
      toggleProgress(false);
    }, 1000);
  };

  return (
    <div>
      {showProgress && <LinearProgress />}
      <form id="messaging-input">
        <textarea
          className="chatInputBox"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          placeholder="Type something to send..."
        />
        <div className="emojiPickerButton" onClick={() => setShowEmojiPicker((prev) => !prev)} />
        <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => sendFileMessage(e)} />
        <label className="button" htmlFor="fileElem" />
      </form>
    </div>
  );
};

export default Input;
