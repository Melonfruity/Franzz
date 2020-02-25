/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useField } from '../../../../../hooks/useField';
import { handleFiles } from '../../Modules/Photos/Scripts/DragAndDropPhotos';
import { LinearProgress, useScrollTrigger } from '@material-ui/core';


const Input = ({ emitSendMessage, channel }) => {
  const message = useField('text');
  const [showProgress, toggleProgress] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    toggleProgress(true);
    emitSendMessage(message.value);
    toggleProgress(false);
    message.reset();
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
          {...message}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
          placeholder="Type something to send..."
        />
        <button
          id="send-button"
          type="submit"
          onClick={(e) => sendMessage(e)}
        />
        <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => sendFileMessage(e)} />
        <label className="button" htmlFor="fileElem" />
      </form>
    </div>
  );
};

export default Input;
