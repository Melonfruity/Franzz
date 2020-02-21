import React from 'react';
import NormalLogin from './Login/NormalLogin';
import Username from './Login/Username';
import GoogleLogin from './Login/GoogleLogin';

const Landing = ({ setState }) => (
  <section className="landingContainer">
    <div className="landingPage">
      <h1>JEK</h1>
      <p>Stay in touch, no matter where you are in the world.</p>
      <Username setState={setState} />
      <NormalLogin setState={setState} />
      <GoogleLogin setState={setState} />
    </div>
  </section>
);

export default Landing;
