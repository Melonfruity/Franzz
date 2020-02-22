import axios from 'axios';
import Global from '../Global';

const serverURL = Global.serverURL;

const guest = async (usernameObj) => {
  const res = await axios.post(`${serverURL}/auth/guest`, usernameObj);
  if (!res.error) {
    console.log(res.data)
    const { token, username, guest, userID } = res.data;
    Global.updateCredentials(res.data);
    return { authorization: token, username, guest, userID };
  } else {
    return { error: res.error };
  }
};

const login = async (loginObj) => {
  const res = await axios.post(`${serverURL}/auth/login`, loginObj);
  const { token, username, guest, userID } = res.data;
  console.log(res.data)
  if (!res.error) {
    Global.updateCredentials(res.data);
    return { authorization: token, username, guest, userID };
  } else {
    return { error: res.error };
  }
};

const register = async (registerObj) => {
  const config = {
    headers: { authorization: await Global.getLocal('authorization') },
  };
  const res = await axios.post(`${serverURL}/auth/register`, registerObj, config);
  if (!res.error) {
    const { token, username, guest, userID } = res.data;
    Global.updateCredentials(res.data);
    return { authorization: token, username, guest, userID };
  } else {
    return { error: res.error };
  }
};

const initialize = async () => {
  const config = {
    headers: { authorization: await Global.getLocal('authorization') },
  };
  const res = await axios.get(`${serverURL}/channel/initialize`, config);
  return res.data;
}

export default {
  guest,
  login,
  register,
  initialize,
}