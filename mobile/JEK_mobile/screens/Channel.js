import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import { ScrollView, FlatList } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { GiftedChat } from 'react-native-gifted-chat';

const Channel = ({ state, setState, channel, socket }) => {

  const { messages, users } = state.channelStates[channel];

  const sendMessage = (text) => {
    const messageObj = {
      message: text[0] ? text[0].text : '',
      channelID: channel,
      authorization: state.authorization,
      username: state.username,
    }
    console.log(messageObj)
    socket.emit('message', messageObj, (newMessageObj) => {
      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [channel]: {
              ...prev.channelStates[channel],
              messages: prev.channelStates[channel].messages.concat(newMessageObj),
            },
          },
        }));
    });
  }

  const formattedMessages = messages.map((msg) => {
    return ({
      _id: msg.id,
      text: msg.message,
      createdAt: msg.created,
      user: {
        _id: msg.user.id,
        name: msg.user.username,
      }
    })
  }).reverse();

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={formattedMessages}
        onSend={(message) => sendMessage(message)}
        user={{
          _id: state.currentUser,
        }}
      />
      {
        Platform.OS === 'android' ? <KeyboardSpacer /> : null
      } 
    </View>
  )
}

export default Channel;
