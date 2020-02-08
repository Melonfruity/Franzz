/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import TextContainer from './TextContainer';

import { useField } from '../../../../hooks/useField';

const Chatbox = ({ channel }) => {
  const message = useField('text');
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(message);
    await axios.post('http://localhost:8001/api/channel/messages', { message: message.value, channel: '5e3a3aba4474001f23d55834' }, { headers: { Authorization: window.localStorage.token } });
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
