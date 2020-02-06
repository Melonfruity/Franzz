import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../utils/config';

import axios from 'axios';

const GoogleLoginButton = () => {

  const onSuccess = (data) => {
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
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
