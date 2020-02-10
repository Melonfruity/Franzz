import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';

import './Chat.css';

const Chat = ({ messages, sendMessage, message }) => {

  return (
    <div className="container">
      <TextContainer
        messages={messages}
      />
      <Input
        sendMessage={sendMessage}
        message={message}
      />
    </div>
  );
};

export default Chat;
