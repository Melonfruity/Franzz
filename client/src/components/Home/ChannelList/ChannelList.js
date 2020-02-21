/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ChannelItem from './ChannelItem';
import Modal from './NewChannelModal';
import './channelList.css';

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair, emitJoinChannel, emitCreateChannel,
}) => {
  const channelList = channelIdNamePair.map((pair) => {
    const { name, id } = pair;
    return (
      <li className="channelItems" key={id}>
        <ChannelItem
          name={name}
          id={id}
          selectCurrentChannel={selectCurrentChannel}
        />
      </li>
    );
  });

  return (
    <div className="temporary">
      <h3>Channel List</h3>
      <div className="channelList">
        {channelList}
      </div>
    </div>
  );
};

export default ChannelList;
