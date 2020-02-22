import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import io from 'socket.io-client';
import channelService from '../../service/channelService';
import Modal from './ChannelList/NewChannelModal';
import Channel from './Channel/Channel';
import ChannelList from './ChannelList/ChannelList';
import RightUI from './Channel/RightUI';
import { useChat } from '../../hooks/useChat';
import { useMap } from '../../hooks/useMap';
import './homeStyling.css';
import PopupToast from './PopUpToast';
import '../../styles.css';


let socket;

const Home = ({ state, setState }) => {  
  const {
    emitSendMessage,
    emitJoinChannel,
    emitCreateChannel,
  } = useChat(state, setState, socket);
  const {
    grabLocations,
    intializeMapsData,
  } = useMap(state, setState, socket);
  console.log(state.channelStates);
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
          setState((prev) => ({
            ...prev,
            channelStates,
            currentChannel: Object.keys(channelStates)[0],
          }));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Sorry to hoever needs to debug this
  // this is hack - vasily
  useEffect(() => {
    if (!state.currentChannelLoaded) {
      setState((prev) => ({ ...prev, currentChannelLoaded: true }));
    } else {
      setState((prev) => ({ ...prev, loaded: true }));
    }
  }, [state.currentChannel]);

  useEffect(() => {
    if (socket) intializeMapsData();

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

    socket.on('user status', ({ userStatus }) => {
      const { channel, users } = userStatus;
      console.log(channel, users);
      setState((prev) => ({
        ...prev,
        users: {
          ...prev.users,
          [channel]: users,
        },
      }));
    });

    socket.on('update location', ({ channel, newLocations }) => {
      if (newLocations) {
        setState((prev) => ({
          ...prev,
          locations: {
            ...prev.locations,
            [channel]: newLocations,
          },
        }));
      }
    });

    return () => {
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const channels = Object.keys(state.channelStates);
  const channelIdNamePair = channels.map((id) => ({ id, name: state.channelStates[id].name }));

  const selectCurrentChannel = (channel) => {
    setState((prev) => ({ ...prev, currentChannel: channel }));
  };

  const toggleForm = (s) => {
    setState((prev) => ({ ...prev, newChannelForm: s }));
  };

  const channelItems = channels.map((id) => {
    const { name, messages } = state.channelStates[id];
    return (
      <Route
        path={`/channel/${id}`}
        key={`${id}`}
      >
        <Channel
          channel={id}
          name={name}
          messages={messages}
          users={state.users[id]}
          emitSendMessage={emitSendMessage}
          locations={grabLocations(id)}
          center={state.center}
          currentUser={state.currentUser}
        />
      </Route>
    );
  });

  return (
    <div id="main-container">
      <Router>
        <ChannelList
          selectCurrentChannel={selectCurrentChannel}
          channelIdNamePair={channelIdNamePair}
          emitJoinChannel={emitJoinChannel}
          emitCreateChannel={emitCreateChannel}
          toggleForm={toggleForm}
        />
        <Switch>
          {channelItems}
        </Switch>
        {state.loaded && !state.currentChannel && (
        <Modal
          emitCreateChannel={emitCreateChannel}
          emitJoinChannel={emitJoinChannel}
        />
        )}
        <PopupToast
          show={state.newChannelForm}
          toggleForm={toggleForm}
          emitCreateChannel={emitCreateChannel}
          emitJoinChannel={emitJoinChannel}
        />
        <Redirect exact from="/home" to={`/channel/${state.currentChannel}`} />
      </Router>
    </div>
  );
};

export default Home;
