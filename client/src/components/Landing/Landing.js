import React from 'react';
import Login from './Login/Login';

const Landing = ({ setLoggedIn }) => {

  return (
    <div>
      <Login setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default Landing;
