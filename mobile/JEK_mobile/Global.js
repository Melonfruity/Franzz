import { AsyncStorage } from 'react-native';
const serverURL = 'https://arcane-bastion-72484.herokuapp.com/api';

const loadCredentials = async () => {
  const credentials = {
    guest: await getLocal('guest'),
    currentUser: await getLocal('userID'),
    username: await getLocal('username'),
    authorization: await getLocal('authorization'),
  }
  return credentials;
};

const updateCredentials = async (credentials) => {
  const { token, username, guest, userID } = credentials;
  const updatedCredentials = await Promise.all([
    storeLocal('guest', `${guest}`),
    storeLocal('userID', userID),
    storeLocal('username', username),
    storeLocal('authorization', token)]
  )
  return updatedCredentials;
};

const storeLocal = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${key}`, value);
    return value;
  } catch (err) {
    console.log('storeLocal', err);
  }
};

const getLocal = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`${key}`)
    if (value !== null) {
      return value;
    }
  } catch(err) {
    console.log('getLocal', err);
  }
};

const reset = () => {
  Promise.all([
    storeLocal('guest', ''),
    storeLocal('userID', ''),
    storeLocal('username', ''),
    storeLocal('authorization', '')]
  ).then(data => {
    if (data) console.log('successfully reset local', data)
  })
}

module.exports = {
  updateCredentials,
  loadCredentials,
  getLocal,
  serverURL,
  reset,
};