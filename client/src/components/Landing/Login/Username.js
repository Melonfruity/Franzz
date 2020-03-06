/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const Username = ({ setState }) => {
  const username = useField('text');
  const handleLogin = async (e) => {
    e.preventDefault();
    const guestObj = {
      username: username.value,
    };
    auth
      .guestLogin(guestObj)
      .then((loggedIn) => {
        if (loggedIn) {
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            currentUser: window.localStorage.getItem('userID'),
            guest: window.localStorage.getItem('guest'),
          }));
        }
      });
  };

  return (
    <div className="usernameLogin">
      <form>
        <TextField
          placeholder="username"
          // id="outlined-basic"
          variant="outlined"
          label="Username"
          {...username}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        />
        <Button variant="outlined" onClick={(e) => handleLogin(e)}>
          guest login
        </Button>
      </form>
    </div>
  );
};

export default Username;
