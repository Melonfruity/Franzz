/* eslint-disable react/prop-types */
import React from 'react';
import ReactEmoji from 'react-emoji';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';

const Message = ({
  id, username, message, created, emitDeleteMessage, video, image,
}) => {
  // implement delete, edit, emoji

  // if image make <img> tag
  // if video make <video> tag
  console.log('this is my message', message);
  console.log(message);
  return (
    <article>
      {username}
      {': '}
      {image && (
      <CloudinaryContext cloudName="jekmessaging">
        <Image publicId={message} width="50%" />
      </CloudinaryContext>
      )}
      { video && (
      <CloudinaryContext cloudName="jekmessaging">
        <video width="20%" controls>
          <source src={message} type="video/webm" />
          <source src={message} type="video/mp4" />
          <source src={message} type="video/ogg" />
        </video>
      </CloudinaryContext>
      )}
      {!image && !video && ReactEmoji.emojify(message)}
      {'<created at '}
      {created}
      {'>'}
      {/* <button type="button"> delete </button>
      <button type="button"> edit </button>
      <button type="button"> emoji </button> */}
    </article>
  );
};

export default Message;
