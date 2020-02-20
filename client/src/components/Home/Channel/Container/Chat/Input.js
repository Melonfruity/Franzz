/* eslint-disable react/prop-types */
import React from 'react';
import { useField } from '../../../../../hooks/useField';

const Input = ({ emitSendMessage }) => {
  const message = useField('text');

  const sendMessage = (e) => {
    e.preventDefault();
    emitSendMessage(message.value);
    message.reset();
  };

  return (
    <form>
      <textarea
        className="chatInputBox"
        {...message}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        placeholder= "Type something to send..."
      />
      <button
        type="submit"
        onClick={(e) => sendMessage(e)}
      >
        submit
      </button>
    </form>
  );
};

export default Input;
