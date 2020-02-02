import React, { useEffect } from 'react';

import Channel from './components/Channel/Container/Channel';
import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton'
import "./components/Channel/Container/Chat/Styling/PopUpBoxStyling.css";
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';

const ON = "on";
const OFF = "off";

const App = () => {
  const title = 'JEK';

  return (
    <div>
      {title}
      <Channel />
      <PopUpBox mouseDown={mouseDownFunction}/>
      <PopUpButton />
    </div>
  );
};

export default App;
