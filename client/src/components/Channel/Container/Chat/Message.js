/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ id, username, message, created }) => {
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
