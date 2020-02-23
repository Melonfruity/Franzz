import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  SafeAreaView
} from 'react-native';

import service from '../utils/service';

const Home = ({ state, setState, logout, setCurrentChannel, navigation }) => {

  useEffect(() => {
    service
      .initialize()
      .then(({ channelData }) => {
        const channelStates = channelData.reduce((obj, ele) => {
          const { users, name, channel } = ele.data;
          if (!obj[channel]) {
            obj[channel] = {
              users,
              name,
              channel,
              messages: ele.messages,
            }
          }
          return obj;
        }, {})
        setState((prev) => ({
          ...prev,
          channelStates,
        }))
    })
  }, []);

  const cb = () => navigation.navigate('Channel');

  const channels = Object.values(state.channelStates);

  const ChannelItem = ({ item }) => {
    const { channel, name} = item;
    return (
      <View style={styles.item} onPress={() => setCurrentChannel(channel, cb)}>
        <Text style={styles.name} onPress={() => setCurrentChannel(channel, cb)}>{`${name}`}</Text>       
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.list}>
      <Button title="LOG OUT" onPress={() => logout()} />
      <Button title="New Channel" onPress={() => navigation.navigate('New Channel')} />
      <FlatList
        data={channels}
        renderItem={({ item }) => <ChannelItem item={item} />}
        keyExtractor={item => item.channel}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 1,
    borderEndWidth: 1,
  },
  item: {
    backgroundColor: '#777',
    padding: 20,
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 16
  },
  name: {
    fontSize: 20,
  }
})

export default Home;
