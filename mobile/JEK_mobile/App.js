import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
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
import Channel from './screens/Channel';

import Global from './Global';

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
        console.log(data)
      })
    });
    Global.loadCredentials().then(data => {
      setState((prev) => ({
        ...prev,
        ...data
      }));
      console.log('state', state);
    })
  }, []);

  return (
    <SafeAreaView style={{ ...styles.container, ...styles.mainContainer }}>
      <KeyboardAvoidingView behavior="padding" enabled>
        {state.authorization ? <Channel /> : <Login /> }
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
