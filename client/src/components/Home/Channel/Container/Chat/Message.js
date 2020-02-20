/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactEmoji from 'react-emoji';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';
import FsLightbox from 'fslightbox-react';
import moment from 'moment';

const Message = ({
  id, username, message, created, emitDeleteMessage, video, image,
}) => {

  console.log("date", created)
  // implement delete, edit, emoji
  const [toggler, changeToggle] = useState(false);
  return (
    <div>
      <FsLightbox
        toggler={toggler}
        sources={[message]}
      />
      <article className="full-message">
        <div className="chat-name">
          <span>{username}</span>
          {/* {created} */}
        </div>
        <div className="message-content">
          {image && (
          <CloudinaryContext cloudName="jekmessaging">
            <Image className="message-media" publicId={message} width="100%" onClick={() => changeToggle(!toggler)} />
          </CloudinaryContext>
          )}
          { video && (
          <CloudinaryContext cloudName="jekmessaging">
            <video className="message-media" width="100%" onClick={() => changeToggle(!toggler)} controls>
              <source src={message} type="video/webm" />
              <source src={message} type="video/mp4" />
              <source src={message} type="video/ogg" />
            </video>
          </CloudinaryContext>
          )}
          {!image && !video && ReactEmoji.emojify(message)}
          {/* <button type="button"> delete </button>
        <button type="button"> edit </button>
        <button type="button"> emoji </button> */}
        </div>
      </article>
    </div>

  );
};

export default Message;
