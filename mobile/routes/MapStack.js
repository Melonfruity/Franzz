import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const MapStack = createStackNavigator();

import Map from '../screens/Map';

const MapStackScreen = ({ currentUser, currentChannel, locations, center, findLocationAsync }) => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name='Maps'
        options={{
          title: 'Stalker Map'
        }}
      >
        {props =>
          <Map
            {...props}
            currentUser={currentUser}
            locations={locations}
            center={center}
            findLocationAsync={findLocationAsync}
            currentChannel={currentChannel}
          />}
      </MapStack.Screen>
    </MapStack.Navigator>
  );
};

export default MapStackScreen;
