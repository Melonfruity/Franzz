/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const serverURL = 'http://localhost:8001/api/auth';

const register = async (registerObj) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  console.log(config);
  const res = await axios.post(`${serverURL}/register`, registerObj, config);
  const { error, token } = res.data;
  if (error) {
    console.log(error);
  } else {
    window.localStorage.setItem('authorization', token);
  }
};

const guest = async (guestObj) => {
  const res = await axios.post(`${serverURL}/guest`, guestObj)
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
};
