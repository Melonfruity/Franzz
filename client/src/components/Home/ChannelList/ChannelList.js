/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChannelItem from './ChannelItem';

// import ChannelItem from './ChannelItem';
// import './channelList.css';

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair, toggleForm,
}) => {
  const channelList = channelIdNamePair.map((pair) => {
    const { name, id } = pair;
    return (
      <div>
        <li className="channelItems" key={id}>
          <ChannelItem
            name={name}
            id={id}
            selectCurrentChannel={selectCurrentChannel}
          />
        </li>
        <Divider />
      </div>
    );
  });

  return (
    <div className="userHome">
      <button id="create-channel" onClick={() => toggleForm(true)}>+</button>
      <div className="leftBarUI">
        <h3>Channel List</h3>
        <div className="channelList">
          <List>
            {channelList}
          </List>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
