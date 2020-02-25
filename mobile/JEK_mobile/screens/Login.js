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

import Constants from 'expo-constants';

const Login = ({ guest, login }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('mobileJEK@gmail.com');
  const [password, setPassword] = useState('password');

  const Separator = () => <View style={styles.separator} />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}> Select a Username </Text>
      <Separator />
      <TextInput
        style={styles.input}
        placeholder='USERNAME'
        onChangeText={(val) => setUsername(val)}
        value={username}
      />
      <Separator />
      <View style={styles.button}>
        <Button
          title="GO"
          onPress={() => guest({ username })}
        />
      </View>
      <Separator />
      <Separator />
      <Text style={styles.header}> Log In </Text>
      <Separator />
      <TextInput
        style={styles.input}
        placeholder='EMAIL'
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='PASSWORD'
        onChangeText={(val) => setPassword(val)}
        value={password}
        secureTextEntry={true}
      />
      <Separator />
      <View style={styles.button}>
        <Button
          title="LOG IN"
          onPress={() => login({ email, password })}
        />
      </View>
      {
        Platform.OS === 'android' ? <KeyboardSpacer /> : null
      } 
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: 150,
  },
  input: {
    borderColor: '#777',
    borderWidth: StyleSheet.hairlineWidth,
    width: 200,
    height: 40,
    margin: 3,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    fontSize: 24,
  }
})

export default Login;
