import React, { useState } from 'react';
// import io from 'socket.io-client';

import useField from '../../../../hooks/useField';

import Input from './Input';
import TextContainer from './TextContainer';

// const socket = io()

const Chatbox = () => {
  const message = useField('text');
  const messages = useState([
    {
      text: 'sdsadas',
      id: '2131231221asda',
    },
    {
      text: 'sdsad231as',
      id: '2131231321321221asda',
    },
    {
      text: 'sdsada321312s',
      id: '2131231221213213asda',
    },
  ]);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
  };

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
