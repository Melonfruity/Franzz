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

const loadCredentials = async () => {
  console.log('loading Credentials');
  state = {
    ...state,
    guest: await getLocal('guest'),
    currentUser: await getLocal('userID'),
    username: await getLocal('username'),
    authorization: await getLocal('authorization'),
  }
  // console.log('state', state);
  return state;
};

const updateCredentials = async (credentials) => {
  console.log('updating Credentials');
  const { token, username, guest, userID } = credentials;
  state = {
    ...state,
    guest,
    username,
    currentUser: userID,
    authorization: token,
  };
  console.log('storing to Local');
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
  console.log('getting Local');
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
  loadCredentials,
  getLocal,
};