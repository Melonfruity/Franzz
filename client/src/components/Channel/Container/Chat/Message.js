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
      {created}
      {'>'}
      <button type="button"> delete </button>
      <button type="button"> edit </button>
      <button type="button"> emoji </button>
    </article>
  );
};

export default Message;
