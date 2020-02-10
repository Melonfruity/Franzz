import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const GoogleLoginButton = () => {
  const username = useField('text');
  const handleGuestLogin = (e) => {
    e.preventDefault();
    const guestObj = {
      username: username.value,
    };
    auth.guest(guestObj);
  };

  return (
    <form>
      <input
        placeholder="username"
        {...username}
        reset={undefined}
      />
      <button type="button" onClick={handleGuestLogin}>gooo</button>
    </form>
  );
};

export default GoogleLoginButton;
