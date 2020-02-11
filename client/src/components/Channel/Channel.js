import React, {} from 'react';
import { useField } from '../../hooks/useField';
import Chat from './Container/Chat/Chat';

const Channel = ({
  channel, users, name, messages, emitSendMessage, emitDeleteMessage,
}) => {
  return (
    <div>
      {name}
      <Chat
        messages={messages}
        emitSendMessage={emitSendMessage}
        emitDeleteMessage={emitDeleteMessage}
        channel={channel}
      />
    </div>
  );
};

export default Channel;
