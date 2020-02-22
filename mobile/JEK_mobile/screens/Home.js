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
import service from '../utils/service';
import Channel from './Channel';

const Home = ({ state, setState }) => {

  useEffect(() => {
    console.log(state);
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

  const channels = Object.keys(state.channelStates);
  const channelItems = channels.map((id) => {
    const { name, messages } = state.channelStates[id];
    return (
      <View key={`${id}`}>
        <Text>{name}</Text>
      </View>
    )
  })

  return (
    <ScrollView>
      {channelItems}
    </ScrollView>
  )
}

export default Home;
