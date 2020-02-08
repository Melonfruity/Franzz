import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';
import { useField } from '../../../../hooks/useField';
import TextContainer from './TextContainer';

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

  socket.on(`message ${channelID}`, (messageObj) => {
    setMessages([...messages, messageObj]);
  });

  useEffect(() => {
    setMessages((prev) => prev.concat(initialMessages));
  }, [initialMessages]);

  return (
    <>
      <TextContainer messages={messages} />
      <Chatbox
        message={message}
        sendMessage={sendMessage}
      />
    </>
  );
};

export default Chat;
