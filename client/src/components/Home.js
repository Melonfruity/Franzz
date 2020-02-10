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

let socket;

const Home = ({ logOut }) => {
  const [state, setState] = useState({
    currentUser: '',
    selectedChannel: '',
    username: '',
    authorization: '',
    channelStates: {},
  });

  const joinChannelsObj = {
    authorization: window.localStorage.getItem('authorization'),
    username: window.localStorage.getItem('username'),
  };

  const emitMessage = (message, channelID) => {
    const messageObj = {
      message,
      channelID,
      authorization: state.authorization,
      username: state.username,
    };
    socket.emit('message', messageObj, (data) => {
      console.log(data);
    });
  };

  // handle initial state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      ...joinChannelsObj,
    }));
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
      console.log(joinChannelsObj);
      socket.emit('join channels', joinChannelsObj, (data) => {
        console.log(data);
      });
    });
  }, []);

  useEffect(() => {
    socket.on('new message', (data) => {
      console.log(data);
      console.log(state.channelStates);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [state.channelStates]);

  console.log(state);
  const channels = Object.keys(state.channelStates);

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
          emitMessage={emitMessage}
        />
      </Route>
    );
  });

  const channelList = channels.map((id) => {
    const { name } = state.channelStates[id];
    return (
      <li key={id}>
        <Link to={`/channel/${id}`}>{name}</Link>
      </li>
    );
  });

  return (
    <div>
      <Router>
        <Link to="/" onClick={logOut}> Logout</Link>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {channelList}
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
