import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
// import { SplashScreen } from 'expo';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import io from 'socket.io-client';
import Login from './screens/Login';
import HomeStackScreen from './screens/HomeStack';

import axios from 'axios';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';

import Global from './Global';
import service from './utils/service';

let socket;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewChannelStackScreen from './screens/NewChannelStack';
import MapStackScreen from './screens/MapStack';

const Tab = createBottomTabNavigator();

const LOCATION_TASK_NAME = 'get current location'

const App = () => {
  const [state, setState] = useState({
    guest: true,
    currentChannel: '',
    authorization: '',
    username: '',
    channelStates: {},
    locations: {},
    center: {},
    users: {},
  });

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

  const findLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, { accuracy: Location.Accuracy.Balanced });
      service.getLocation(updateLocation);
    }
  }

  const guest = (usernameObj) => {
    service
      .guest(usernameObj)
      .then(({
        error, guest, userID, username, authorization,
      }) => {
        if (!error) {
          console.log(guest, userID, username, authorization)
          console.log('updating state')
          setState((prev) => ({
            ...prev,
            guest,
            currentUser: userID,
            username,
            authorization,
          }));
        }
      })
  }

  const login = (loginObj) => {
    service
      .login(loginObj)
      .then(({
        error, guest, userID, username, authorization,
      }) => {
        if (!error) {
          console.log(guest, userID, username, authorization)
          setState((prev) => ({
            ...prev,
            guest,
            currentUser: userID,
            username,
            authorization,
          }));
        }
      })
  }
  
  const logout = () => {
    setState({
      guest: true,
      currentChannel: '',
      authorization: '',
      username: '',
      channelStates: {},
      locations: {},
      center: {},
      users: {},
    })
    Global.reset();
  }

  const setCurrentChannel = (channel, cb) => {
    setState((prev) => ({
      ...prev,
      currentChannel: channel
    }));
    cb();
  }

  const joinChannel = (channelLink, cb) => {
    const joinChannelObj = {
      channelLink,
      authorization: state.authorization,
    };
    socket.emit('join channel', joinChannelObj, (channelData) => {
      const { error, data, messages } = channelData;
      if (!error) {
        const { channel } = data;

        setState((prev) => (
          {
            ...prev,
            currentChannel: channel,
            channelStates: {
              ...prev.channelStates,
              [channel]: {
                ...data,
                messages,
              },
            },
          }
        ));
        console.log('joined channel', state)
        cb();
      }
    });
  };

  const createChannel = (channelName, cb) => {
    const createChannelObj = {
      channelName,
      authorization: state.authorization,
    };
    socket.emit('create channel', createChannelObj, (channelData) => {
      const { data, messages } = channelData;
      const { channel } = data;

      // initializes a folder in the photo cloud for this channel
      const request = { channelId: `${channel}/chat`, albumName: false };
      axios.post('http://10.0.2.2:8001/api/photos/createEmptyFolder', { body: JSON.stringify(request) });

      setState((prev) => (
        {
          ...prev,
          currentChannel: channel,
          channelStates: {
            ...prev.channelStates,
            [channel]: {
              ...data,
              messages,
            },
          },
        }
      ));
      cb();
    });
  };

  useEffect(() => {
    socket = io('http://10.0.2.2:8001')
    socket.on('connect', () => {
      socket.on('server message', (data) => {
        // console.log(data)
      });
      socket.emit('join channels', { authorization: state.authorization }, (data) => {
        console.log(data);
      });
    });

    if (!state.authorization) {
      Global
        .loadCredentials()
        .then(({
          guest, userID, username, authorization,
        }) => {
          setState((prev) => ({
            ...prev,
            guest,
            currentUser: userID,
            username,
            authorization,
          }));
        })
    }
  }, []);
  
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
  }, []);

  return (
    <NavigationContainer>
      {!state.authorization
        ? ( <Login state={state} login={login} guest={guest} /> )
        : (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
            >
              {props =>
                <HomeStackScreen
                  {...props}
                  state={state}
                  logout={logout}
                  socket={socket}
                  setState={setState}
                  joinChannel={joinChannel}
                  createChannel={createChannel}
                  setCurrentChannel={setCurrentChannel}
                />}
            </Tab.Screen>
            <Tab.Screen
              name='Maps'
            >
              {props =>
                <MapStackScreen
                  {...props}
                  currentUser={state.currentUser}
                  currentChannel={state.currentChannel}
                  locations={state.locations}
                  center={state.center}
                  findLocationAsync={findLocationAsync}
                />}
            </Tab.Screen>
            <Tab.Screen
              name='New Channel'
            >
              {props =>
                <NewChannelStackScreen
                  {...props}
                  joinChannel={joinChannel}
                  createChannel={createChannel}
                />}
            </Tab.Screen>
          </Tab.Navigator>
        )
      }
    </NavigationContainer>
  );
}

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
//   if (error) {
//     // check `error.message` for more details.
//     return;
//   }
//   console.log('Received new locations', locations);
//   const location = { lat: locations[0].coords.latitude, lng: locations[0].coords.longitude }
//   console.log(location)
//   service.updateLocation(location);
// });

export default App;
