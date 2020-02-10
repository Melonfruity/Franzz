import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const Register = ({ setLoggedIn }) => {
  const email = useField('text');
  const password = useField('password');

  const handleRegister = (e) => {
    e.preventDefault();
    const registerObj = {
      email: email.value,
      password: password.value,
      username: window.localStorage.username ? window.localStorage.username : '',
    };
    setLoggedIn(auth.register(registerObj));
  };

  return (
    <form>
      <input
        placeholder="email"
        {...email}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? handleRegister(e) : null)}
      />
      <input
        placeholder="password"
        {...password}
        reset={undefined}
        onKeyPress={(e) => (e.key === 'Enter' ? handleRegister(e) : null)}
      />
      <button type="button" onClick={handleRegister}> Register </button>
    </form>
  );
};

export default Register;
