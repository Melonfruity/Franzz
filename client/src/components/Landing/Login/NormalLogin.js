import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

const NormalLogin = ({ setLoggedIn }) => {
  const email = useField('text');
  const password = useField('password');
  const handleLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      email: email.value,
      password: password.value,
    };
    auth
      .login(loginObj)
      .then((loggedIn) => setLoggedIn(loggedIn));
  };

  return (
    <div>
      <form>
        <input
          placeholder="email"
          {...email}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        />
        <input
          placeholder="password"
          {...password}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        />
        <button
          type="button"
          onClick={handleLogin}
        >
        Log In
        </button>
      </form>
    </div>
  );
};

export default NormalLogin;
