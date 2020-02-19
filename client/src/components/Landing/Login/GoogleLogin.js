import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../utils/config';
import auth from '../../../service/authService';


const GoogleLoginButton = ({ setState }) => {
  const onSuccess = (googleData) => {
    const { accessToken } = googleData;
    const config = {
      headers: { authorization: window.localStorage.authorization },
    };
    axios
      .post('http://localhost:8001/api/auth/google', { accessToken }, config)
      .then((res) => {
        const {
          success, error, token, username, guest,
        } = res.data;
        if (success) {
          auth.setLocalStorage({ token, username, guest });
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            guest: localStorage.getItem('guest'),
          }));
        } else {
          console.log(error);
        }
      });
  };

  const onFailure = (err) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      className="googleLogin"
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Google Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
