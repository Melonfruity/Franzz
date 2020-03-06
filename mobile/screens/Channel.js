import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { GiftedChat } from 'react-native-gifted-chat';

const Channel = ({ state, setState, channel, socket, currentUser }) => {

  const { messages, users } = state.channelStates[channel];

  const sendMessage = (text) => {
    const messageObj = {
      message: text[0] ? text[0].text : '',
      channelID: channel,
      authorization: state.authorization,
      username: state.username,
    }
    socket.emit('message', messageObj, (newMessageObj) => {
      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [channel]: {
              ...prev.channelStates[channel],
              messages: [newMessageObj, ...prev.channelStates[channel].messages],
            },
          },
        }));
    });
  }

  const formattedMessages = messages.map((msg) => {
    console.log(msg.user.id, state.currentUser, currentUser)
    return ({
      _id: msg.id,
      text: msg.message,
      createdAt: new Date(),
      user: {
        _id: msg.user.id,
        name: msg.user.username,
      }
    })
  })
  
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

const styles = StyleSheet.create({
  offset: {

  }
})

export default Channel;
