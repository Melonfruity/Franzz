import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView
} from 'react-native';

import { ScrollView, FlatList } from 'react-native-gesture-handler';

import Message from '../components/Message';

const Channel = ({ state, channel, socket }) => {
  const [message, setMessage] = useState('');

  console.log('channel', channel);

  const { messages, users } = state.channelStates[channel];
  console.log(messages, users); 

  const sendMessage = () => {
    const messageObj = {
      message,
      channelID: channel,
      authorization: state.authorization,
      username: state.username,
    }
    socket.emit('message', messageObj, (newMessageObj) => {
      console.log(newMessageObj);
    });
    setMessage('');
  }

  return (
    <SafeAreaView>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message item={item} isCurrent={item.user.id === state.currentUser} />}
        keyExtractor={item => item.id}
      />
      <TextInput
        placeholder='input'
        onChangeText={(val) => setMessage(val)}
        value={message}
      />
      <Button title='Send' onPress={() => sendMessage()} />
    </SafeAreaView> 
  )
}

export default Channel;
