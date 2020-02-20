/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Modal from './NewChannelModal';
import ChannelItem from './ChannelItem';


const ChannelList = ({
  selectCurrentChannel, channelIdNamePair, emitJoinChannel, emitCreateChannel,
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
      <Modal
        emitCreateChannel={emitCreateChannel}
        emitJoinChannel={emitJoinChannel}
      />
      <div className="rightBarUI">
        <h3>Social</h3>
        <div className="widgetList">
          <p>Friend Tracker</p>
          <p>Spotify</p>
          <p>Photo Gallery</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
