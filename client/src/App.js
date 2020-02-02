import React from 'react';

import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import "./components/Channel/Container/Chat/Styling/PopUpBoxStyling.css";
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';

import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login';

const App = () => {
  const title = 'JEK';


  return (
    <div>
      {title}
      <Channel />
      <PopUpBox mouseDown={mouseDownFunction}/>
      <Login />
    </div>
  );
};

export default App;
