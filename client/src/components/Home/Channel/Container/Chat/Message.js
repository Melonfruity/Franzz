/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactEmoji from 'react-emoji';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';
import FsLightbox from 'fslightbox-react';


const Message = ({
  id, username, message, created, emitDeleteMessage, video, image,
}) => {
  // implement delete, edit, emoji
  const [toggler, changeToggle] = useState(false);

  return (
    <div>
      <FsLightbox
        toggler={toggler}
        sources={[message]}
      />
      <article>
        {username}
        {': '}
        {image && (
        <CloudinaryContext cloudName="jekmessaging">
          <Image publicId={message} width="50%" onClick={() => changeToggle(!toggler)} />
        </CloudinaryContext>
        )}
        { video && (
        <CloudinaryContext cloudName="jekmessaging">
          <video width="20%" onClick={() => changeToggle(!toggler)} controls>
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
    </div>

  );
};

export default Message;
