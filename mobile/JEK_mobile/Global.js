import { useState } from 'react';
import { AsyncStorage } from 'react-native';

const Global = () => {
  const [state, setState] = useState({
    guest: true,
    currentChannel: '',
    authorization: '',
    username: '',
    channelStates: {},
    locations: {},
    center: {},
    users: {},
  })

  const updateCredentials = (credentials) => {
    const { token, username, guest, userID } = credentials;
    setState((prev) => ({
      ...prev,
      
    }))
  }

  return {
    state,
    updateCredentials,
  }
};