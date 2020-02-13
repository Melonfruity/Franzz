import axios from 'axios';

const serverURL = 'http://localhost:8001/api';
// const serverURL = 'https://arcane-bastion-72484.herokuapp.com/api';

const getUserData = async () => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.get(`${serverURL}/channel/initialize`, config);
  return res.data;
};

const getInvite = async (channelID) => {
  const config = {
    headers: { authorization: window.localStorage.authorization },
  };
  const res = await axios.get(`${serverURL}/channel/invite/${channelID}`, config);
  return res.data;
};

export default {
  getUserData,
  getInvite,
};
