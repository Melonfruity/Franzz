/* eslint-disable react/prop-types */
import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChannelItem from './ChannelItem';

// import './channelList.css';

const ChannelList = ({
  selectCurrentChannel, channelIdNamePair, toggleForm,
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
    <div className="leftBarUI">
      <div id="leftBarTitle">
        <button type="button" id="create-channel" onClick={() => toggleForm(true)}>+ Create/join a channel</button>
      </div>
      <div className="channelList">
        <List>
          {channelList}
        </List>
      </div>
    </div>
  );
};

export default ChannelList;
