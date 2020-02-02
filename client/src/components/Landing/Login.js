import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../utils/config';

const Login = () => {
  const googleResponse = (res) => {
    console.log(res)
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
