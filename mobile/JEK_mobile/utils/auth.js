import axios from 'axios';
import Global from '../Global';

const serverURL = 'http://10.0.2.2:8001/api';

const username = async (usernameObj) => {
  const res = await axios.post(`${serverURL}/auth/guest`, usernameObj);
  if (!res.error) {
    Global.updateCredentials(res.data);
  } else {
    console.log(res.error);
  }
};

const login = async (loginObj) => {
  const res = await axios.post(`${serverURL}/auth/login`, loginObj);
  console.log(res.data)
  if (!res.error) {
    Global.updateCredentials(res.data);
  } else {
    console.log(res.error);
  }
};

const register = async (registerObj) => {
  const config = {
    headers: { authorization: Global.getLocal('authorization') },
  };
  const res = await axios.post(`${serverURL}/auth/register`, registerObj, config);
  if (!res.error) {
    Global.updateCredentials(res.data);
  } else {
    console.log(res.error);
  }
};

export default {
  username,
  login,
  register,
}