import React from 'react';

// import GoogleLoginButton from './GoogleLogin';
import GoogleLoginButton from './GoogleLogin';
import NormalLogin from './NormalLogin';
import Register from './Register';
import Guest from './GuestLogin';

const Login = ({ setLoggedIn }) => (
  <div>
    <GoogleLoginButton setLoggedIn={setLoggedIn} />
    <NormalLogin setLoggedIn={setLoggedIn} />
    <Register setLoggedIn={setLoggedIn} />
    <Guest setLoggedIn={setLoggedIn} />
  </div>
);

export default Login;
