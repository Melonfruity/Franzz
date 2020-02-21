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

import auth from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');

  return (
    <View>
      <Text style={styles.text}>Select a Username</Text>
      <TextInput
        style={styles.text}
        placeholder='username'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <Button title="GO" onPress={() => auth.username(username)} />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#777',
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Login;
