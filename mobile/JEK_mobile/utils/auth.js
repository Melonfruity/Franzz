import axios from 'axios';

const serverURL = 'http://10.0.2.2:8001/api';

const username = async (username) => {
  const usernameObj = {
    username,
  };
  const res = await axios.post(`${serverURL}/auth/guest`, usernameObj);
  console.log(res.data);   
};

const login = async (loginObj) => {
  const res = await axios.post(`${serverURL}/auth/login`, loginObj);
  return setLocalStorage(res.data);
};

const register = async (registerObj) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.post(`${serverURL}/auth/register`, registerObj, config);
  return setLocalStorage(res.data);
};

export default {
  username,
}