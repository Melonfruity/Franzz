/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ id, username, message, created }) => {
  const byUser = false;
  return (
    <article>
      {id}
      {' '}
      {username}
      {': '}
      {ReactEmoji.emojify(message)}
      {'<created at '}
      {created}
      {'>'}
    </article>
  );
};

export default Message;
