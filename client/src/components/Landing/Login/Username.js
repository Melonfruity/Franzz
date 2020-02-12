import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const Username = ({ setUserExists }) => {
  const username = useField('text');
  const handleSelectUser = async (e) => {
    e.preventDefault();
    const guestObj = {
      username: username.value,
    };
    auth
      .guestLogin(guestObj)
      .then((loggedIn) => setUserExists(loggedIn));
  };

  return (
    <form>
      <input
        placeholder="username"
        {...username}
        reset={undefined}
      />
      <button type="button" onClick={handleSelectUser}>-&gt;</button>
    </form>
  );
};

export default Username;
