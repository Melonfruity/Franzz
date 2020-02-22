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

import { ScrollView } from 'react-native-gesture-handler';

import Message from '../components/Message';

const Channel = ({ messages, currentUser }) => {

  const formattedMessages = messages.map((msg) => (
    <Message
      key={msg.id}
      id={msg.id}
      message={msg.message}
      created={msg.created}
      username={msg.user.username}
      currentUser={currentUser}
      isCurrent={msg.user.id === currentUser}
      userId={msg.user.id}
      deleteMessage={deleteMessage}
      video={msg.video}
      image={msg.image}
    />
  ));

  return (
    <Text>
      Already Signed In
    </Text> 
  )
}

export default Channel;
