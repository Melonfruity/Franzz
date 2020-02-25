import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const Login = ({ guest, login }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('mobileJEK@gmail.com');
  const [password, setPassword] = useState('password');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={styles.text}
      >
        Select a Username
      </Text>
      <TextInput
        style={{ ...styles.text, ...styles.border }}
        placeholder='username'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <Button
        title="GO"
        onPress={() => guest({ username })}
      />
      <Text
        style={styles.text}
      >
        OR LOG IN
      </Text>
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
      <Button
        title="LOG IN"
        style={styles.button}
        onPress={() => login({ email, password })}
      />
      {
        Platform.OS === 'android' ? <KeyboardSpacer /> : null
      } 
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8,
    margin: 2,
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
  },
  button: {
    flex: 1,
    width: 500,
    marginTop: 50,
  }
})

export default Login;
