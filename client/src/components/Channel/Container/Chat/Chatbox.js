/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Input from './Input';
import TextContainer from './TextContainer';

import useField from '../../../../hooks/useField';
import { info } from '../../../../utils/logger';

const db = [
  {
    channel_id: 1,
    messages: [
      {
        text: 'sdsadas',
        id: '1',
      },
      {
        text: 'sdsad231as',
        id: '2',
      },
      {
        text: 'sdsada321312s',
        id: '3',
      },
    ],
  },
  {
    channel_id: 2,
    messages: [
      {
        text: 'sdsa3432432432423432das',
        id: '1',
      },
      {
        text: 'sdsad231a32423432423432432s',
        id: '2',
      },
      {
        text: 'sdsada32131232423432432423432s',
        id: '3',
      },
    ],
  },
];

const Chatbox = ({ channel }) => {
  const message = useField('text');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    info('server recieved the message');
  };

  useEffect(() => {
    const channelMessages = db.filter((msgs) => msgs.channel_id === channel.id);
    if (channelMessages[0]) {
      setMessages(channelMessages[0].messages);
    }
  }, [channel]);

  return (
    <div>
      <TextContainer
        messages={messages}
      />
      <Input
        message={message}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chatbox;
