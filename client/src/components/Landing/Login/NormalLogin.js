import React from 'react';

import axios from 'axios';

import { useField } from '../../../hooks/useField';

const NormalLogin = () => {
  const email = useField('text');
  const password = useField('text');

  const onSuccess = (data) => {
    console.log(data);
  };

  const onFailure = (err) => {
    console.log(err);
  };

  return (
    <form>
      <input
        {...email}
        reset={undefined}
      />
      <input
        {...password}
        reset={undefined}
      />
      <button type="button">
        Log In
      </button>
    </form>
  );
};

export default NormalLogin;
