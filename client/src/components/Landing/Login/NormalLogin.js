import React from 'react';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';
import SignInInput from '../SignInInput'
import Button from 'react-bootstrap/Button'

const NormalLogin = ({ setState }) => {
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
    <div className="normalLogin">
      <form>
        {/* <input
          placeholder="email"
          {...email}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        /> */}
        <SignInInput name="E-mail"  handleLogin={handleLogin} ></SignInInput>
        {/* <input
          placeholder="password"
          {...password}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        /> */}
        <SignInInput name="Password" handleLogin={handleLogin} ></SignInInput>
        {/* <button
          type="button"
          onClick={handleLogin}
        >
        Log In
        </button> */}
        <Button onClick={handleLogin}
        >Log In</Button>
      </form>
    </div>
  );
};

export default NormalLogin;
