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
import { ScrollView } from 'react-native-gesture-handler';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={{...styles.border, ...styles.mt}}>
      <Text style={styles.text}>Select a Username</Text>
      <TextInput
        style={{ ...styles.text, ...styles.border }}
        placeholder='username'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <Button title="GO" onPress={() => auth.username({ username })} />
      <Text style={styles.text}> OR </Text>
      <Text style={styles.text}> LOG IN </Text>
      <TextInput
        style={{ ...styles.text, ...styles.border }}
        placeholder='email'
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <TextInput
        style={{ ...styles.text, ...styles.border }}
        placeholder='password'
        onChangeText={(val) => setPassword(val)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="LOG IN" onPress={() => auth.login({ email, password })} />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8,
    margin: 10,
    width: 200,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  border: {
    borderColor: '#777',
    borderWidth: 1,
  },
  mt: {
    marginTop: 10,
  }
})

export default Login;
