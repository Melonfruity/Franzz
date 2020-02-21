import { AsyncStorage } from 'react-native';

let state = {
  guest: true,
  currentChannel: '',
  authorization: '',
  username: '',
  channelStates: {},
  locations: {},
  center: {},
  users: {},
};

const updateCredentials = async (credentials) => {
  const { token, username, guest, userID } = credentials;
  console.log(state)
  state = {
    ...state,
    guest,
    username,
    currentUser: userID,
    authorization: token,
  };
  console.log(state);
  storeLocal('guest', `${guest}`);
  storeLocal('userID', userID);
  storeLocal('username', username);
  storeLocal('authorization', token);
};

const storeLocal = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${key}`, value);
  } catch (err) {
    console.log(err);
  }
};

const getLocal = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`${key}`)
    if (value !== null) {
      return value;
    }
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  state,
  updateCredentials,
  getLocal,
};