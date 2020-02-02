import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chatbox from './Container/Chat/Chatbox';
import ChannelList from './LeftBar/ChannelList/ChannelList';
import NewChannel from './NewChannel';

import { info } from '../../utils/logger';

let socket;

const channelData = [
  {
    id: 1,
    name: 'channel 1',
  },
  {
    id: 2,
    name: 'channel 2',
  },
  {
    id: 3,
    name: 'channel 3',
  },
  {
    id: 4,
    name: 'channel 4',
  },
];

const Channel = () => {
  const [channels, setChannels] = useState([]); // list of user channels
  const [channel, setChannel] = useState({}); // current channel

  const [showCreateJoin, setShowCreateJoin] = useState(false);

  const selectChannel = (id) => setChannel(channelData.filter((chn) => chn.id === id)[0]);

  const newChannel = () => {
    setShowCreateJoin((prev) => !prev);
  };

  useEffect(() => {
    setChannels(channelData);
    // do it in initial render cause then it will connect before that...
    socket = io('http://localhost:8001/channel');
    socket.on('connect', () => {
      // from servers
      socket.on('serverMsg', (data) => {
        info(data);
      });

      socket.emit('message', 'client connected', () => {
        info('sent message to server');
      });
    });
  }, []);

  return (
    <div>
      Channels
      <ChannelList
        channels={channels}
        selectChannel={selectChannel}
        newChannel={newChannel}
      />
      <Chatbox
        channel={channel}
      />
      {
        // change this later as a popup
      }
      { showCreateJoin ? <NewChannel /> : <></>}
    </div>
  );
};

export default Channel;
