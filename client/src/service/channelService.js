import axios from 'axios';

import { serverURL } from '../utils/config';

const getUserData = async () => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.get(`${serverURL}/api/channel/initialize`, config);
  return res.data;
};

const getInvite = async (channelID) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.get(`${serverURL}/api/channel/invite/${channelID}`, config);
  return res.data;
};

export default {
  getUserData,
  getInvite,
};
