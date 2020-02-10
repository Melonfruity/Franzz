/* eslint-disable react/prop-types */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

import './TextContainer.css';

const TextContainer = ({ messages }) => {
  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      message={msg.message}
      username={msg.user.username}
      created={msg.created}
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
