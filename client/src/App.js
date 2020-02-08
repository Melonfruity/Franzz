import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import './components/Channel/Container/Chat/Styling/PopUpBoxStyling.css';
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';
import useToggleButton from './hooks/useToggleButton';

// import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login/Login';

// const ON = 'on';

const App = () => {
  const { boxDisplay, clickedButton } = useToggleButton('off');

  const credentials = {
    email: 'email@gmail.com',
    password: 'password',
  };

  useEffect(() => {
    axios
      .post('http://localhost:8001/api/auth/login', credentials)
      .then((res) => {
        const { channels } = res.data;
        window.localStorage.setItem('token', res.data.token);
        return channels;
      });
  });

  return (
    <div>
      {/* <Channel /> */}
      {/* { boxDisplay === ON && <PopUpBox mouseDown={mouseDownFunction} /> } */}
      {/* <PopUpButton toggleButton={clickedButton} /> */}
      <Login />
    </div>
  );
};

export default App;
