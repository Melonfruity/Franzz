/* eslint-disable react/prop-types */
import React from 'react';
import Message from './Message';

const TextContainer = ({ messages }) => {
  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      message={msg.message}
      username={msg.user.username}
      created={msg.created}
      id={msg.id}
    />
  ));

  return (
    <div>
      {formattedMessages}
    </div>
  );
};

export default TextContainer;
