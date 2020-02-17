import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import io from 'socket.io-client';
import channelService from '../../service/channelService';

import Channel from './Channel/Channel';
import ChannelList from './ChannelList/ChannelList';
import useChat from '../../hooks/useChat';

let socket;

const Home = ({ state, setState }) => {

  const {
    emitSendMessage,
    emitJoinChannel,
    emitCreateChannel,
  } = useChat(state, setState, socket);

  // handle initial state
  useEffect(() => {
    // grab all channel data, messages
    if (state.authorization) {
      channelService
        .getUserData()
        .then(({ channelData }) => {
          const channelStates = channelData.reduce((obj, ele) => {
            if (!obj[ele.data.channel]) {
              // eslint-disable-next-line no-param-reassign
              obj[ele.data.channel] = {
                users: ele.data.users,
                name: ele.data.name,
                channel: ele.data.channel,
                messages: ele.messages,
              };
            }
            return obj;
          }, {});
          setState((prev) => ({ ...prev, channelStates }));
        });
    }
    // change api end point later
    socket = io('http://localhost:8001/');
    // socket = io('https://arcane-bastion-72484.herokuapp.com/');
    socket.on('connect', () => {
      // from servers
      socket.on('server message', (data) => {
        console.log(data);
      });
      socket.emit('join channels', { authorization: state.authorization }, (data) => {
        console.log(data);
      });
    });
  }, [state.authorization]);

  useEffect(() => {
    socket.on('new message', (data) => {
      const { channelID, newMessageObj } = data;
      if (channelID && newMessageObj) {
        setState((prev) => (
          {
            ...prev,
            channelStates: {
              ...prev.channelStates,
              [channelID]: {
                ...prev.channelStates[channelID],
                messages: prev.channelStates[channelID].messages.concat(newMessageObj),
              },
            },
          }));
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  const channels = Object.keys(state.channelStates);
  const channelIdNamePair = channels.map((id) => ({ id, name: state.channelStates[id].name }));

  const selectCurrentChannel = (channel) => {
    setState((prev) => ({ ...prev, currentChannel: channel }));
  };

  const channelItems = channels.map((id) => {
    const { users, name, messages } = state.channelStates[id];
    return (
      <Route
        path={`/channel/${id}`}
        key={`${id}`}
      >
        <Channel
          channel={id}
          name={name}
          messages={messages}
          users={users}
          emitSendMessage={emitSendMessage}
        />
      </Route>
    );
  });

  return (
    <div>
      <Router>
        <nav>
          <ul>
            <ChannelList
              selectCurrentChannel={selectCurrentChannel}
              channelIdNamePair={channelIdNamePair}
              emitJoinChannel={emitJoinChannel}
              emitCreateChannel={emitCreateChannel}
            />
          </ul>
        </nav>
        <Switch>
          {channelItems}
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
