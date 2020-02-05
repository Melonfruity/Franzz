import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import Chatbox from './Container/Chat/Chatbox';
import ChannelList from './LeftBar/ChannelList/ChannelList';
import NewChannel from './NewChannel';

import { info } from '../../utils/logger';

let socket;

const Channel = () => {
  const [channels, setChannels] = useState([]); // list of user channels
  const [channel, setChannel] = useState({}); // current channel

  const [showCreateJoin, setShowCreateJoin] = useState(false);

  const selectChannel = (id) => {
    setChannel(id);
  };

  const newChannel = () => {
    setShowCreateJoin((prev) => !prev);
  };

  useEffect(() => {

    const credentials = {
      email: 'email@gmail.com',
      password: 'password',
    };

    axios
      .post('http://localhost:8001/api/auth/login', credentials)
      .then((res) => {
        const { user } = res.data;
        return user.channels;
      })
      .then((chns) => {
        setChannels(chns);
      });

    // do it in initial render cause then it will connect before that...
    socket = io('http://localhost:8001/channel');
    socket.on('connect', () => {
      // from servers
      socket.on('server message', (data) => {
        info(data);
      });

      socket.emit('message', 'client connected', () => {
        info('sent message to server');
      });
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div>
      Channels
      <ChannelList
        channels={channels === undefined ? [] : channels}
        selectChannel={selectChannel}
        newChannel={newChannel}
      />
      <Chatbox
        channel={channel}
      />
      { showCreateJoin ? <NewChannel /> : <></>}
    </div>
  );
};

export default Channel;
