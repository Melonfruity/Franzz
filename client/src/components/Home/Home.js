import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import io from 'socket.io-client';
import { serverURL } from '../../utils/config';

import channelService from '../../service/channelService';
import mapService from '../../service/mapService';

import NewChannelModal from './ChannelList/NewChannelModal';
import ChannelList from './ChannelList/ChannelList';
import Channel from './Channel/Channel';

import PopupToast from './PopUpToast';

import { useYoutube } from '../../hooks/useYoutube';
import { useChat } from '../../hooks/useChat';

import './homeStyling.css';
import '../../styles.css';

let socket;

const Home = ({ state, setState }) => {
  const {
    emitSendMessage,
    emitJoinChannel,
    emitCreateChannel,
  } = useChat(state, setState, socket);

  const {
    changeVideoState,
    syncVideo,
  } = useYoutube(state, setState, socket);

  const sendLine = (line) => {
    const lineObj = {
      line,
      channel: state.currentChannel,
      user: state.currentUser,
    };
    setState((prev) => ({
      ...prev,
      lines: {
        ...prev.lines,
        [state.currentChannel]: {
          ...prev.lines[state.currentChannel],
          [state.currentUser]: {
            user: state.currentUser,
            line,
          },
        },
      },
    }));
    socket.emit('draw', lineObj);
  };

  const updateLocation = (location) => {
    const locationObj = {
      location,
      authorization: state.authorization,
    };
    socket.emit('update location', locationObj, (locations) => {
      setState((prev) => ({
        ...prev,
        locations,
        center: location,
      }));
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(() => {
        mapService.getLocation(updateLocation);
      });
    }
  };

  const channels = Object.keys(state.channelStates);
  const channelIdNamePair = channels.map((id) => ({ id, name: state.channelStates[id].name }));

  const selectCurrentChannel = (channel) => {
    setState((prev) => ({ ...prev, currentChannel: channel }));
  };

  const toggleForm = (s) => {
    setState((prev) => ({ ...prev, newChannelForm: s }));
  };

  const channelItems = channels.map((id) => {
    const { name, messages, users } = state.channelStates[id];
    return (
      <Route
        path={`/channel/${id}`}
        key={`${id}`}
      >
        <Channel
          channel={id}
          name={name}
          messages={messages}
          userStatus={state.users[id]}
          userList={users}
          emitSendMessage={emitSendMessage}
          locations={state.locations[id]}
          center={state.center}
          currentUser={state.currentUser}
          videoStates={state.videoStates}
          changeVideoState={changeVideoState}
          syncVideo={syncVideo}
          sendLine={sendLine}
          lines={state.lines[id]}
          isGuest={state.guest}
          setState={setState}
        />
      </Route>
    );
  });

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
    socket = io(`${serverURL}/`);
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

  useEffect(() => {
    if (!state.currentChannelLoaded) {
      setState((prev) => ({ ...prev, currentChannelLoaded: true }));
    } else {
      setState((prev) => ({ ...prev, loaded: true }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentChannel]);

  useEffect(() => {
    mapService.getLocation(updateLocation);
    getLocation();

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
      setState((prev) => ({
        ...prev,
        users: {
          ...prev.users,
          [channel]: users,
        },
      }));
    });

    socket.on('update location', (updatedLocations) => {
      if (updatedLocations) {
        setState((prev) => ({
          ...prev,
          locations: {
            ...prev.locations,
            ...updatedLocations,
          },
        }));
      }
    });

    socket.on('new video state', ({
      url, paused, played, channel,
    }) => {
      if (url) {
        setState((prev) => (
          {
            ...prev,
            videoStates: { ...prev.videoStates, [channel]: { url, paused, played } },
          }
        ));
      }
    });

    socket.on('new time stamp', ({
      time, channel,
    }) => {
      setState((prev) => (
        {
          ...prev,
          videoStates: {
            ...prev.videoStates,
            [channel]: { ...prev.videoStates[channel], timeStamp: time },
          },
        }
      ));
    });

    socket.on('draw', ({ user, channel, line }) => {
      setState((prev) => ({
        ...prev,
        lines: {
          ...prev.lines,
          [channel]: {
            ...prev.lines[channel],
            [user]: {
              user,
              line,
            },
          },
        },
      }));
    });

    return () => {
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <NewChannelModal
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
