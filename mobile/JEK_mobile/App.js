import React, { useEffect, useState } from 'react';
// import { SplashScreen } from 'expo';
// import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import io from 'socket.io-client';
import Login from './screens/Login';
import axios from 'axios';

import * as Permissions from 'expo-permissions';

import Global from './Global';
import service from './utils/service';

let socket;

import NewChannelStackScreen from './routes/NewChannelStack';
import MapStackScreen from './routes/MapStack';
import HomeStackScreen from './routes/HomeStack';


const Tab = createBottomTabNavigator();

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
      axios.post('https://arcane-bastion-72484.herokuapp.com/api/photos/createEmptyFolder', { body: JSON.stringify(request) });
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
    // socket = io('http://10.0.2.2:8001')
    socket = io('https://arcane-bastion-72484.herokuapp.com')
    socket.on('connect', () => {
      socket.on('server message', (data) => {
      });
      socket.emit('join channels', { authorization: state.authorization }, (data) => {
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
                messages: [newMessageObj, ...prev.channelStates[channelID].messages],
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
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'md-home'
                    : 'md-home';
                } else if (route.name === 'Maps') {
                  iconName = focused ? 'md-map' : 'md-map';
                } else if (route.name === 'New Channel'){
                  iconName = focused ? 'md-chatboxes' : 'md-chatboxes';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              }
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              keyboardHidesTabBar: true,
            }}
          >
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
                  findLocationAsync={findLocationAsync}
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
                  logout={logout}
                />}
            </Tab.Screen>
          </Tab.Navigator>
        )
      }
    </NavigationContainer>
  );
}

export default App;
