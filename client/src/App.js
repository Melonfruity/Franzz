import React from 'react';

import Channel from './components/Channel/Container/Channel';
import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import "./components/Channel/Container/Chat/Styling/PopUpBoxStyling.css";
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';


const App = () => {
  const title = 'JEK';


  return (
    <div>
      {title}
      <Channel />
      <PopUpBox mouseDown={mouseDownFunction}/>
    </div>
  );
};

export default App;
