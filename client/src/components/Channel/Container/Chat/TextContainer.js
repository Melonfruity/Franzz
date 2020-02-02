/* eslint-disable react/prop-types */
import React from 'react';
import Message from './Message';

const TextContainer = ({ messages }) => {
  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      message={msg.text}
    />
  ));

  return (
    <div>
      {formattedMessages}
    </div>
  );
};

export default TextContainer;
