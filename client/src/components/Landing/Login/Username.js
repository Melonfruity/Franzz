import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';
import NewAccountRegistration  from '../../../Modal'
import SignInInput from '../SignInInput'

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
            guest: window.localStorage.getItem('guest'),
          }));
        }
      });
  };

  return (
    <div className="usernameLogin">
    <form >
      {/* <input
        placeholder="username"
        {...username}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
      /> */}
      <SignInInput name="Username" handleLogin={handleLogin}></SignInInput>
      <NewAccountRegistration handleLogin={handleLogin}></NewAccountRegistration>
    </form>
    </div>
  );
};

export default Username;
