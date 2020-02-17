/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelItem from './ChannelItem';
import NewChannelItem from './NewChannelItem';

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair, emitJoinChannel, emitCreateChannel,
}) => {
  const channelList = channelIdNamePair.map((pair) => {
    const { name, id } = pair;
    return (
      <li key={id}>
        <ChannelItem
          name={name}
          id={id}
          selectCurrentChannel={selectCurrentChannel}
        />
      </li>
    );
  });

  return (
    <div>
      <li>
        <Link to="/home">Home</Link>
      </li>
      {channelList}
      <NewChannelItem
        emitCreateChannel={emitCreateChannel}
        emitJoinChannel={emitJoinChannel}
      />
    </div>
  );
};

export default ChannelList;
