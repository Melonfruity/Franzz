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

const Channel = ({ joinChannel, createChannel, navigation }) => {
  const [channelName, setChannelName] = useState('');
  const [channelLink, setChannelLink] = useState('');

  const cb = () => navigation.navigate('Channel');
  
  const handleJoinChannel = () => {
    joinChannel(channelLink, cb);
    setChannelLink('');
  }
  
  const handleCreateChannel = () => {
    createChannel(channelName, cb);
    setChannelName('');
  }
  
  return (
    <View style={{ flex: 1 }}>
        <Text>Enter invite code:</Text>
        <TextInput
          placeholder='code'
          onChangeText={(val) => setChannelLink(val)}
          value={channelLink}
        />
        <Button title="Join!" onPress={() => handleJoinChannel()} />
        <Text>Enter channel name:</Text>
        <TextInput
          placeholder='name'
          onChangeText={(val) => setChannelName(val)}
          value={channelName}
        />
        <Button title="Join!" onPress={() => handleCreateChannel()} />
    </View>
  )
}

export default Channel;
