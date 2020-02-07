import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const NormalLogin = () => {
  const email = useField('text');
  const password = useField('text');

  const handleLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      email: email.value,
      password: password.value,
    };
    auth.login(loginObj);
  };

  return (
    <form>
      <input
        placeholder="email"
        {...email}
        reset={undefined}
      />
      <input
        placeholder="password"
        {...password}
        reset={undefined}
      />
      <button
        type="button"
        onClick={handleLogin}
      >
        Log In
      </button>
    </form>
  );
};

export default NormalLogin;
