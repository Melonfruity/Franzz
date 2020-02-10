/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ username, message, created }) => {
  return (
    <article>
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
