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

import KeyboardSpacer from 'react-native-keyboard-spacer';

const NewChannelStackScreen = ({ joinChannel, createChannel, navigation, logout }) => {
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

  const Separator = () => <View style={styles.separator} />
  
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Log out" onPress={() => logout()} />
      </View>
      <Separator />
      <Text style={styles.header}>Enter channel name:</Text>
      <TextInput
        placeholder='name'
        onChangeText={(val) => setChannelName(val)}
        value={channelName}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="Create!" onPress={() => handleCreateChannel()} />
      </View>
      <Separator />
      <Text style={styles.header}>Enter invite code:</Text>
      <TextInput
        placeholder='code'
        onChangeText={(val) => setChannelLink(val)}
        value={channelLink}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="Join!" onPress={() => handleJoinChannel()} />
      </View>
      {
        Platform.OS === 'android' ? <KeyboardSpacer /> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: 150,
  },
  input: {
    borderColor: '#777',
    borderWidth: StyleSheet.hairlineWidth,
    width: 200,
    height: 40,
    margin: 3,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    fontSize: 24,
  }
});

export default NewChannelStackScreen;
