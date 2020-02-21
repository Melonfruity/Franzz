/* eslint-disable react/prop-types */
import React from 'react';
import { useField } from '../../../../../hooks/useField';
import { handleFiles } from '../../Modules/Photos/Scripts/DragAndDropPhotos';

const Input = ({ emitSendMessage, channel }) => {
  const message = useField('text');

  const sendMessage = (e) => {
    e.preventDefault();
    emitSendMessage(message.value);
    message.reset();
  };

  return (
    <form id="messaging-input">
      <textarea
        className="chatInputBox"
        {...message}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        placeholder= "Type something to send..."
      />
      <button
        id="send-button"
        type="submit"
        onClick={(e) => sendMessage(e)}
      >
      </button>
      <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files, channel, 'chat', emitSendMessage)} />
      <label className="button" htmlFor="fileElem"></label>
    </form>
  );
};

export default Input;
