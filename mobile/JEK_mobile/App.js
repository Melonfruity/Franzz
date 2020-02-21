import React, { useEffect, useState, useRef } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, SafeAreaView } from 'react-native';
// import { SplashScreen } from 'expo';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client';

import Login from './screens/Login';

const App = () => {
  const [text, setText] = useState('');
  
  let socket;

  useEffect(() => {
    socket = io('http://10.0.2.2:8001')
    socket.on('connect', () => {
      socket.on('server message', (data) => {
        setText(data.serverMsg);
      })
    });
  }, []);

  console.log(socket)
  console.log('hi')
  return (
    <View style={styles.container}>
      <Login />
      <Text> {text} </Text>
      <Text> Hi </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
})

export default App;
