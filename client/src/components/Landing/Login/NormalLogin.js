import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useField } from '../../../hooks/useField';
import auth from '../../../service/authService';

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
        <TextField
          placeholder="email"
          label="E-mail"
          id="outlined-basic"
          variant="outlined"
          {...email}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        />
        <TextField
          placeholder="password"
          labal="Password"
          id="outlined-basic"
          variant="outlined"
          {...password}
          reset={undefined}
          onKeyPress={(e) => (e.key === 'Enter' ? handleLogin(e) : null)}
        />
        <Button
          variant="outlined"
          type="button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default NormalLogin;
