import axios from 'axios';
import Global from '../Global';

const serverURL = 'http://10.0.2.2:8001/api';

const username = async (usernameObj) => {
  const res = await axios.post(`${serverURL}/auth/guest`, usernameObj);
  const { error, token, username, guest, userID } = res.data;
  if (!error) {
    Global.updateCredentials(res.data);
  }
  console.log(await Global.getLocal('guest'))
  // Global.getLocal('userID')
  // Global.getLocal('username')
  // Global.getLocal('authorization')
  // const config = {
  //   headers: {authorization: `${token}` },
  // };
  // await axios.get(`${serverURL}/channel/initialize`, config).then(res => console.log(res.data))
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