const axios = require('axios');

const url = 'http://localhost:8001';
const reset = async () => {

  const credentials = {
    email: 'email@gmail.com',
    password: 'password',
  };

  // register
  // await axios.post(`${url}/api/auth/register`, credentials);

  // login
  const response = await axios.post(`${url}/api/auth/login`, credentials);
  const { token } = response.data;

  const headers = {
    Authorization: token,
  };

  // create a channel
  const channel = await axios
    .post(`${url}/api/channel/new`, { channelName: 'channel name' }, headers)
  
  console.log(channel)
  // const messageObj = {
  //   message: 'message',
  //   channel: 
  // };

  // const sendMessage = await axios.post(`${url}/api/channel/messages`, );

};

reset();
