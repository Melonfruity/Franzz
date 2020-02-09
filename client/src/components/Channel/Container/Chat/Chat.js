import React, { useEffect, useState } from 'react';
import { useField } from '../../../../hooks/useField';
import TextContainer from './TextContainer';
import Input from './Input';

const Chat = ({ channelID, initialMessages, socket }) => {
  // define emit message event
  const message = useField('text');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      message: message.value,
      channelID,
      authorization: window.localStorage.getItem('authorization'),
      username: window.localStorage.getItem('username'),
    };
    socket.emit('message', messageObj, (data) => {
      console.log(data);
    });
  };

  socket.on(`new message ${channelID}`, (messageObj) => {
    console.log(messageObj);
    setMessages([...messages, messageObj]);
  });

  useEffect(() => {
    setMessages((prev) => prev.concat(initialMessages));
  }, [initialMessages]);

  return (
    <>
      <TextContainer messages={messages} />
      <Input
        message={message}
        sendMessage={sendMessage}
      />
    </>
  );
};

export default Chat;
