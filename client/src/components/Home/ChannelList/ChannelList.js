/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Modal from './NewChannelModal';
import ChannelItem from './ChannelItem';

=======
import ChannelItem from './ChannelItem';
import './channelList.css';
>>>>>>> styling/chatbox

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair,
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
    </div>
  );
};

export default ChannelList;
