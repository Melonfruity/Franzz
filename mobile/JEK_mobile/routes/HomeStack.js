import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

import Home from '../screens/Home';
import Channel from '../screens/Channel';

const HomeStackScreen = ({ state, logout, socket, setState, joinChannel, createChannel, setCurrentChannel }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' >
        {props => <Home
          {...props}
          state={state}
          setState={setState}
          logout={logout}
          setCurrentChannel={setCurrentChannel}
        />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='Channel'
        options={{
          title: state.channelStates[state.currentChannel] ? `${state.channelStates[state.currentChannel].name}` : 'Channel'
        }}
      >
        {props =>
          <Channel
            {...props}
            socket={socket}
            state={state}
            setState={setState}
            channel={state.currentChannel}
          />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
