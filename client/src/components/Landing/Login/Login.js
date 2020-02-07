import React from 'react';

import GoogleLoginButton from './GoogleLogin';
import NormalLogin from './NormalLogin';
import Register from './Register';
import Guest from './GuestLogin';

const Login = () => {
  return (
    <>
      <GoogleLoginButton />
      <NormalLogin />
      <Register />
      <Guest />
    </>
  );
};

export default Login;
