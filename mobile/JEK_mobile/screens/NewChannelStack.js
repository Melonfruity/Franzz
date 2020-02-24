import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const NewChannelStack = createStackNavigator();

import NewChannel from './NewChannel';

const NewChannelStackScreen = ({ joinChannel, createChannel }) => {
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
          />}
      </NewChannelStack.Screen>
    </NewChannelStack.Navigator>
  );
};

export default NewChannelStackScreen;
