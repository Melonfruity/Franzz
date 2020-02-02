/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

const NewChannelItem = ({ newChannel }) => {
  const ChannelItemStyle = {
    border: '1px solid black',
  };
  return (
    <article
      style={ChannelItemStyle}
      onClick={newChannel}
    >
      Create / Join Channel Button for Popup
    </article>
  );
};

export default NewChannelItem;
