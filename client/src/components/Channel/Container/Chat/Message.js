/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({
  id, username, message, created, emitDeleteMessage,
}) => {
  // implement delete, edit, emoji

  // if image make <img> tag
  // if video make <video> tag

  return (
    <article>
      {username}
      {': '}
      {ReactEmoji.emojify(message)}
      {'<created at '}
      {/* <img src="/var/folders/jg/j2j8jlkd4yz9q0scv_fryp6w0000gn/T/upload_db6f76e83f08dd92a95a7fb4074e1966" alt="example" /> */}
      {created}
      {'>'}
      {/* <button type="button"> delete </button>
      <button type="button"> edit </button>
      <button type="button"> emoji </button> */}
    </article>
  );
};

export default Message;
