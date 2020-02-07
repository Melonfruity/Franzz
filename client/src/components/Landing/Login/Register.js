import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const Register = () => {
  const email = useField('text');
  const password = useField('password');

  const handleRegister = (e) => {
    e.preventDefault();
    const registerObj = {
      email: email.value,
      password: password.value,
      username: window.localStorage.username ? window.localStorage.username : '',
    };
    auth.register(registerObj);
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
      <button type="button" onClick={handleRegister}> Register </button>
    </form>
  );
};

export default Register;
