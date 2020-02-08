/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const serverURL = 'http://localhost:8001/api';

const login = async (loginObj) => {
  const res = await axios.post(`${serverURL}/auth/login`, loginObj);
  const { error, token, username } = res.data;
  if (error) {
    console.log(error);
  } else {
    window.localStorage.setItem('authorization', token);
    window.localStorage.setItem('username', username);
  }
};

const register = async (registerObj) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.post(`${serverURL}/auth/register`, registerObj, config);
  const { error, token } = res.data;
  if (error) {
    console.log(error);
  } else {
    window.localStorage.setItem('authorization', token);
  }
};

const guest = async (guestObj) => {
  const res = await axios.post(`${serverURL}/auth/guest`, guestObj);
  const { error, token } = res.data;
  if (error) {
    console.log(error);
  } else {
    window.localStorage.setItem('authorization', token);
  }
};

export default {
  register,
  guest,
  login,
};
