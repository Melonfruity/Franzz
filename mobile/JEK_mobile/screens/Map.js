import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';


const MapScreen = ({ locations, center, findLocationAsync }) => {   
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    const locate = setInterval(() => {
      findLocationAsync();
    }, 10000);
    
    if (center) {
      setMapReady(true);
    }
      return () => {
        clearTimeout(locate);
      }
    }, [])

  const usersLocations = Object.values(Object.values(locations).reduce((obj, arr) => {
    arr.forEach(e => {
      if (!obj[e.id]) {
        obj[e.id] = {
          id: e.id,
          coordinates: {
            latitude: e.location.lat,
            longitude: e.location.lng,
          },
          username: e.username
        }
      }
    }); 
    return obj
  }, {}))

  const locationMarkers = usersLocations.map((user) =>
    <Marker
      key={user.id}
      coordinate={user.coordinates}
      title={user.username}
    >
      <Text>{user.username}</Text>
    </Marker>
  )
  return (
    <View style={styles.container}>
      {mapReady ? (<MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {locationMarkers}
      </MapView>) :
      <View />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;

