import React, { useEffect, useState } from 'react';

import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import './components/Channel/Container/Chat/Styling/PopUpBoxStyling.css';
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';
import useToggleButton from './hooks/useToggleButton';

// Temp styling for drop-box
import './styling/DragAndDropBox.scss';


import Channel from './components/Channel/Channel';
import Login from './components/Landing/Login';
import DragAndDrop from './components/Channel/Container/Photos/DragAndDrop';
import {
  Image, Video, Transformation, CloudinaryContext,
} from 'cloudinary-react';

const ON = 'on';

const App = () => {
  const { boxDisplay, clickedButton } = useToggleButton('off');
  const [highlightClass, change] = useState('');

  const title = 'JEK';

  function handleFiles(files) {
    ([...files]).forEach((file) => console.log(file));
  }

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const { files } = dt;

    handleFiles(files);
  }

  function highlight() {
    change('highlight');
  }

  function unhighlight() {
    change('');
  }

  function DragEnter() {
    highlight();
  }

  function DragLeave() {
    unhighlight();
  }

  function DragOver() {
    highlight();
  }
  return (
    <div>
      {/* {title}
      <Image cloudName="demo" publicId="samples/food/spices" width="300" crop="scale" />
      <Channel />
      { boxDisplay === ON && <PopUpBox mouseDown={mouseDownFunction} /> }
      <PopUpButton toggleButton={clickedButton} />
      <Login /> */}
      <DragAndDrop Highlight={highlightClass} Drop={handleDrop} DragEnter={DragEnter} DragLeave={DragLeave} DragOver={DragOver} />
    </div>
  );
};

export default App;
