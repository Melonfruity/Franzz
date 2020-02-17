/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({
  id, username, message, created, emitDeleteMessage,
}) => {
  // implement delete, edit, emoji

  return (
    <article>
      {username}
      {': '}
      {ReactEmoji.emojify(message)}
      {'<created at '}
      {/* <img src="https://res.cloudinary.com/jekmessaging/image/upload/v1580958253/sample.jpg" alt="example" /> */}
      {created}
      {'>'}
      {/* <button type="button"> delete </button>
      <button type="button"> edit </button>
      <button type="button"> emoji </button> */}
    </article>
  );
};

export default Message;
