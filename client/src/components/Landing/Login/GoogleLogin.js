import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import auth from '../../../service/authService';
import { GOOGLE_CLIENT_ID, serverURL } from '../../../utils/config';

const GoogleLoginButton = ({ setState }) => {
  const onSuccess = (googleData) => {
    const { accessToken } = googleData;
    const config = {
      headers: { authorization: window.localStorage.authorization },
    };
    axios
<<<<<<< HEAD
      .post(`${serverURL}/auth/google`, { accessToken }, config)
=======
      .post(`${serverURL}/api/auth/google`, { accessToken }, config)
>>>>>>> mobilefix
      .then((res) => {
        const {
          success, error, token, username, guest, userID,
        } = res.data;
        if (success) {
          auth.setLocalStorage({
            token, username, guest, userID,
          });
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            guest: localStorage.getItem('guest'),
            currentUser: localStorage.getItem('userID'),
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
