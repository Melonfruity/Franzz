import React from 'react';
import { useField } from '../../../hooks/useField';

const Register = () => {
  const email = useField('text');
  const password = useField('password');

  return (
    <div>
      <input
        {...email}
        reset={undefined}
      />
      <input
        {...password}
        reset={undefined}
      />
    </div>
  );
};

export default Register;
