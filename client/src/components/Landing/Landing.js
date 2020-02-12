import React from 'react';
import NormalLogin from './Login/NormalLogin';
import Username from './Login/Username';

const Landing = ({ setUserExists }) => {
  return (
    <div>
      <Username setUserExists={setUserExists} />
      <NormalLogin setUserExists={setUserExists} />
    </div>
  );
};

export default Landing;
