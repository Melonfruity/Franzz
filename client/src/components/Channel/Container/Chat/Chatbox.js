/* eslint-disable react/prop-types */
import React from 'react';
import Input from './Input';

const Chatbox = ({ message, sendMessage }) => (
  <div>
    <Input
      message={message}
      sendMessage={sendMessage}
    />
  </div>
);

export default Chatbox;
