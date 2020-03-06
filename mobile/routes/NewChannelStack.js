import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const NewChannelStack = createStackNavigator();

import NewChannel from '../screens/NewChannel';

const NewChannelStackScreen = ({ joinChannel, createChannel, logout }) => {
  return (
    <NewChannelStack.Navigator>
      <NewChannelStack.Screen
        name='New Channel'
        options={{
          title: 'Join or Create a New Channel!'
        }}
      >
        {props =>
          <NewChannel
            {...props}
            joinChannel={joinChannel}
            createChannel={createChannel}
            logout={logout}
          />}
      </NewChannelStack.Screen>
    </NewChannelStack.Navigator>
  );
};

export default NewChannelStackScreen;
