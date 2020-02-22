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
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client';
import Login from './screens/Login';
import Home from './screens/Home';

import Global from './Global';
import service from './utils/service';

let socket;

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
      })
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

  return (
    <SafeAreaView style={{ ...styles.container, ...styles.mainContainer }}>
      <KeyboardAvoidingView behavior="padding" enabled>
        <Button title="LOG OUT" onPress={() => logout()} />
        {state.authorization ? <Home state={state} setState={setState} /> : <Login logout={logout} login={login} guest={guest} /> }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})

export default App;
