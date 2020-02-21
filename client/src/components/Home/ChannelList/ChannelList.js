/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChannelItem from './ChannelItem';

// import './channelList.css';

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair,
}) => {
  const channelList = channelIdNamePair.map((pair) => {
    const { name, id } = pair;
    return (
      <div key={id}>
        <li className="channelItems">
          <ChannelItem
            key={id}
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
      <div className="leftBarUI">
        <div>
          <Link to="/home">Home</Link>
        </div>
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
