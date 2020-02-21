import React from 'react';
import { useField } from '../../hooks/useField';
import auth from '../../service/authService';
import GoogleLogin from '../Landing/Login/GoogleLogin';

const Register = ({ setState }) => {
  const email = useField('text');
  const password = useField('password');

  const handleRegister = (e) => {
    e.preventDefault();
    const registerObj = {
      email: email.value,
      password: password.value,
    };
    auth
      .register(registerObj)
      .then((registered) => {
        if (registered) {
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            guest: localStorage.getItem('guest'),
            currentUser: localStorage.getItem('userID'),
          }));
        }
      });
  };

  return (
    <section className="registration">
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
      <div className="googleLoginButton">
        <GoogleLogin setState={setState} />
      </div>
    </section>
  );
};

export default Register;
