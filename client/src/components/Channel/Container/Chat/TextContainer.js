/* eslint-disable react/prop-types */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

import './TextContainer.css';

const TextContainer = ({ messages, deleteMessage }) => {
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

  return (
    <div className="textContainer">
      <ScrollToBottom class="messages">
        {formattedMessages}
      </ScrollToBottom>
    </div>
  );
};

export default TextContainer;
