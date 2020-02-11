import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';

import './Chat.css';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel,
}) => {
  console.log(channel);
  return (
    <div className="container">
      <TextContainer
        messages={messages}
        emitDeleteMessage={emitDeleteMessage}
      />
      <Input
        emitSendMessage={emitSendMessage}
      />
    </div>
  );
};

export default Chat;
