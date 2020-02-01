import React from 'react';
import useField from '../../hooks/useField';
import { API_ENDPOINT } from '../../utils/config';
import axios from 'axios';

const Login = () => {

  const username = useField('text');
  const password = useField('password');
  console.log(API_ENDPOINT)
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    // <form onSubmit={handleLogin}>
    //   <input
    //     {...username}
    //     reset={undefined}
    //   />
    //   <input
    //     {...password}
    //     reset={undefined}
    //   />
    //   <button type="submit">
    //     Login
    //   </button>
    // </form>
    <button type="button" onClick={(e) => axios.get(`${API_ENDPOINT}/api/auth/google`).then(data => console.log(data))}>
      Google
    </button>
  );
};

export default Login;
