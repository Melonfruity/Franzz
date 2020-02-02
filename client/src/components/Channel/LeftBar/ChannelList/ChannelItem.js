/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

const ChannelItem = ({ channel, selectChannel }) => {
  const ChannelItemStyle = {
    border: '1px solid black',
  };

  return (
    <div
      style={ChannelItemStyle}
      onClick={() => selectChannel(channel.id)}
    >
      {channel.id}
      {' '}
      {channel.name}
    </div>
  );
};

export default ChannelItem;
