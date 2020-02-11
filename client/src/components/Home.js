import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import io from 'socket.io-client';
import channelService from '../service/channelService';

import Channel from './Channel/Channel';
import ChannelList from './Channel/LeftBar/ChannelList/ChannelList';

let socket;

const Home = ({ logOut }) => {
  const [state, setState] = useState({
    currentUser: '',
    currentChannel: '',
    authorization: window.localStorage.getItem('authorization'),
    username: window.localStorage.getItem('username'),
    channelStates: {},
  });

  console.log(state);
  const emitDeleteMessage = (messageID) => {
  };

  const emitEditMessage = (messageID) => {
  };

  const emitSendMessage = (message) => {
    const channelID = state.currentChannel;
    const messageObj = {
      message,
      channelID,
      authorization: state.authorization,
      username: state.username,
    };
    socket.emit('message', messageObj, (newMessageObj) => {
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
    });
  };

  const emitJoinChannel = (channelLink) => {
    socket.emit('join channel', channelLink, (data) => {
      console.log(data);
    });
  };

  const emitCreateChannel = (channelName) => {
    const createChannelObj = {
      channelName,
      authorization: state.authorization,
    };
    socket.emit('create channel', createChannelObj, (channelData) => {
      const { data, messages } = channelData;
      const { channel } = data;

      // initializes a folder in the photo cloud for this channel
      const request = { channelId: `${channel}/chat`, albumName: false };
      fetch('http://localhost:8001/api/photos/createEmptyFolder', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => { console.log(res); })
        .catch((err) => { console.log(err); });

      fetch('/channel', {
        method: 'POST',
        body: channel,
      })
        .then((res) => { console.log(res); })
        .catch((err) => { console.log(err); });


      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [channel]: {
              ...data,
              messages,
            },
          },
        }
      ));
    });
  };

  // handle initial state
  useEffect(() => {
    // grab all channel data, messages
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
  }, []);

  useEffect(() => {
    socket = io('http://localhost:8001/');
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
      console.log(data);
      // console.log(state.channelStates[data.channelID]);

      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [data.channelID]: {
              ...prev.channelStates[data.channelID],
              messages: prev.channelStates[data.channelID].messages.concat(data.newMessageObj),
            },
          },
        }));
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [state.channelStates]);

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
        <Link to="/" onClick={logOut}> Logout</Link>
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
