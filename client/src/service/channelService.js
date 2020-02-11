import axios from 'axios';

const serverURL = 'http://localhost:8001/api';

const getUserData = async () => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.get(`${serverURL}/channel/initialize`, config);
  return res.data;
};

const createChannel = async (createChannelObj) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.post(`${serverURL}`, createChannelObj, config);
  console.log(res);
};

const joinChannel = async (channelID) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.put(`${serverURL}/channel/join/${channelID}`, config);
  console.log(res);
};

export default {
  getUserData,
  createChannel,
  joinChannel,
};
