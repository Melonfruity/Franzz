/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const serverURL = 'http://localhost:8001/api';
// const serverURL = 'https://arcane-bastion-72484.herokuapp.com/api';

const setLocalStorage = (data) => {
  const {
    error, token, username, guest, userID,
  } = data;
  if (error) {
    console.log(error);
    return false;
  }
  window.localStorage.setItem('authorization', token);
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('guest', guest);
  window.localStorage.setItem('userID', userID);
  return true;
};

const login = async (loginObj) => {
  const res = await axios.post(`${serverURL}/auth/login`, loginObj);
  console.log(res)
  return setLocalStorage(res.data);
};

const register = async (registerObj) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.post(`${serverURL}/auth/register`, registerObj, config);
  return setLocalStorage(res.data);
};

const guestLogin = async (guestObj) => {
  const res = await axios.post(`${serverURL}/auth/guest`, guestObj);
  return setLocalStorage(res.data);
};

export default {
  register,
  guestLogin,
  login,
  setLocalStorage,
};
