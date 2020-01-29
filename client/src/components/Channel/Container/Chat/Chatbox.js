import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import useField from '../../../../hooks/useField';

import Input from './Input';
import TextContainer from './TextContainer';

const socket = io('http://localhost:3333/channel');

const Chatbox = () => {
  const message = useField('text');
  const [messages, setMessages] = useState([
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
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message', 'sent a message', () => {
      console.log('server recieved the message');
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('message', 'client connected', () => {
        console.log('sent message to server');
      });
    });

    socket.on('channel message', (data) => {
      console.log(data);
    });

  });

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
