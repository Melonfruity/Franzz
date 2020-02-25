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
  TouchableHighlight,
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

  // const Separator = () => <View style={styles.separator} />

  const ChannelItem = ({ item }) => {
    const { channel, name } = item;
    return (
      <TouchableHighlight
        onPress={() => setCurrentChannel(channel, cb)}    
        underlayColor="white"
        style={styles.item}
        >
        <Text style={styles.name}>{`${name.toUpperCase()}`}</Text>
      </TouchableHighlight>
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
    backgroundColor: '#f1f1f1',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: Dimensions.get('window').width - 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 5,
    margin: 10,
    elevation: 5,
  },
  name: {
    flex: 1,
    fontFamily: 'sans-serif-medium',
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
    letterSpacing: 3,
    margin: 10,
  },
  separator: {
    marginVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default Home;
