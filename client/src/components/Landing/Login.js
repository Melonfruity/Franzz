import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../utils/config';

const Login = () => {
  const googleResponse = (data) => {
    axios
      .post('http://localhost:8001/api/auth/google', data)
      .then((res) => console.log(res.data));
  };

  const onFailure = (err) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Google Login"
      onSuccess={googleResponse}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default Login;
