import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';
import NewAccountRegistration  from '../../../Modal'

const Username = ({ setState }) => {
  const username = useField('text');
  const handleSelectUser = async (e) => {
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
      <input
        placeholder="username"
        {...username}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? handleSelectUser(e) : null)}
      />
      <NewAccountRegistration  handleSelectUser={handleSelectUser}></NewAccountRegistration>
    </form>
    </div>
  );
};

export default Username;
