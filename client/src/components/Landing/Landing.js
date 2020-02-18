import React from 'react';
import NormalLogin from './Login/NormalLogin';
import Username from './Login/Username';
import GoogleLogin from './Login/GoogleLogin';


const Landing = ({ setState }) => {
  return (
    <div className="landingPage">
      <Username setState={setState} />
      <NormalLogin setState={setState} />
      <GoogleLogin setState={setState} />
    </div>
  );
};

export default Landing;
