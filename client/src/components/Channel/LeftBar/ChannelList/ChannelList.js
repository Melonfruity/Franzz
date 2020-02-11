/* eslint-disable react/prop-types */
import React from 'react';

import ChannelItem from './ChannelItem';
import NewChannelItem from './NewChannelItem';

const ChannelList = ({ channels, selectChannel, newChannel }) => {

  const list = channels.map((channel) => (
    <ChannelItem
      key={channel.id}
      channel={channel}
      selectChannel={selectChannel}
    />
  ));

  return (
    <div>
      {list}
      <NewChannelItem
        newChannel={newChannel}
      />
    </div>
  );
};

export default ChannelList;
