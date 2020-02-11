import React, {} from 'react';
import { useField } from '../../hooks/useField';
import Chat from './Container/Chat/Chat';

const Channel = ({
  channel, users, name, messages, emitMessage,
}) => {
  const message = useField('text');

  const sendMessage = (e) => {
    e.preventDefault();
    emitMessage(message.value, channel);
    message.reset();
  };

  return (
    <div>
      {name}
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        message={message}
      />
    </div>
  );
};

export default Channel;
