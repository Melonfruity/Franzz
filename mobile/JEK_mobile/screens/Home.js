import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Button,
  SafeAreaView
} from 'react-native';

import service from '../utils/service';


const Home = ({ state, setState, logout, setCurrentChannel, navigation, findLocationAsync }) => {

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
        findLocationAsync();
    })
  }, []);

  const cb = () => navigation.navigate('Channel');

  const channels = Object.values(state.channelStates);

  const Separator = () => <View style={styles.separator} />

  const ChannelItem = ({ item }) => {
    const { channel, name } = item;
    return (
      <View style={styles.item}>
        <Button
          style={styles.name} 
          onPress={() => setCurrentChannel(channel, cb)}
          title={`${name.toUpperCase()}`}       
        />
        <Separator />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={channels}
        renderItem={({ item }) => <ChannelItem item={item} />}
        keyExtractor={item => item.channel}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    width: Dimensions.get('window').width - 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderWidth: 1,
    margin: 1,
  },
  name: {
    flex: 2,
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default Home;
