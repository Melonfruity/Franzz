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
import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client';
import Login from './screens/Login';
import Home from './screens/Home';
import Channel from './screens/Channel';

import Global from './Global';
import service from './utils/service';

let socket;
const Stack = createStackNavigator();

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

  useEffect(() => {
    socket = io('http://10.0.2.2:8001')
    socket.on('connect', () => {
      socket.on('server message', (data) => {
        // console.log(data)
      });
      socket.emit('join channels', { authorization: state.authorization }, (data) => {
        console.log(data);
      });
      // socket.on('new message', (data) => {
      //   console.log('new message')
      //   const { channelID, newMessageObj } = data;
      //   if (channelID && newMessageObj) {
      //     setState((prev) => (
      //       {
      //         ...prev,
      //         channelStates: {
      //           ...prev.channelStates,
      //           [channelID]: {
      //             ...prev.channelStates[channelID],
      //             messages: prev.channelStates[channelID].messages.concat(newMessageObj),
      //           },
      //         },
      //       }));
      //   }
      // });
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

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={state.authorization ? "Home" : "Login"}>
          {!state.authorization ? (
            <Stack.Screen
              name='Login'
              options={{
                title: 'Login Screen',
                animationTypeForReplace: state.authorization ? 'pop' : 'push',
              }}
            >
              {props => <Login { ...props } state={state} login={login} guest={guest} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name='Home'
              options={{
                title: 'Home Screen'
              }}
            >
              {props => 
                <Home
                  { ...props }
                  state={state}
                  setState={setState}
                  logout={logout}
                  setCurrentChannel={setCurrentChannel}
                />}
            </Stack.Screen>
          )}
          <Stack.Screen
            name='Channel'
            options={{
              title: state.channelStates[state.currentChannel] ? `${state.channelStates[state.currentChannel].name}` : 'Channel'
            }}
          >
            {props => <Channel {...props} socket={socket} state={state} channel={state.currentChannel} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;
