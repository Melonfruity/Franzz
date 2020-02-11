/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useField } from '../../../../hooks/useField';

const NewChannelItem = ({ emitCreateChannel, emitJoinChannel }) => {
  const ChannelItemStyle = {
    border: '1px solid black',
  };

  const channelName = useField('text');
  const channelLink = useField('text');

  const createChannel = (e) => {
    e.preventDefault();
    emitCreateChannel(channelName.value);
    channelName.reset();
  };

  const joinChannel = (e) => {
    e.preventDefault();
    emitJoinChannel((channelLink.value));
    channelLink.reset();
  };

  return (
    <article
      style={ChannelItemStyle}
    >
      <div> Create / Join Channel Button for Popup </div>
      <input
        {...channelName}
        reset={undefined}
        placeholder="channel name"
        onKeyPress={(e) => (e.key === 'Enter' ? createChannel(e) : null)}
      />
      <input
        {...channelLink}
        reset={undefined}
        placeholder="channel link"
        onKeyPress={(e) => (e.key === 'Enter' ? joinChannel(e) : null)}
      />
    </article>
  );
};

export default NewChannelItem;
