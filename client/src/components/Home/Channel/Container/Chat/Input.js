/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React from 'react';
import { handleFiles } from '../../Modules/Photos/Scripts/DragAndDropPhotos';

const Input = ({
  message, setMessage, emitSendMessage, channel, setShowEmojiPicker,
}) => {
  const sendMessage = (e) => {
    e.preventDefault();
    emitSendMessage(message);
    setMessage('');
  };

  return (
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
      <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files, channel, 'chat', emitSendMessage)} />
      <label className="button" htmlFor="fileElem" />
    </form>
  );
};

export default Input;
