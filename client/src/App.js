import React, { useEffect, useState } from 'react';

import PopUpBox from './components/Channel/Container/Chat/PopUpBox';
import PopUpButton from './components/Channel/Container/PopUpButtons/PopUpButton';
import './components/Channel/Container/Chat/Styling/PopUpBoxStyling.css';
import { mouseDownFunction } from './components/Channel/Container/Chat/Scripts/PopUpBoxScript';
import useToggleButton from './hooks/useToggleButton';
import { dragEnter, dragLeave, dragOver, handleDrop } from './components/Channel/Container/Photos/DragAndDrop'


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

  //Maybe keep this, this highlights the box when image is dragged over
  const [highlightClass, change] = useState('');

  const title = 'JEK';

  return (
    <div>
      {/* {title}
      <Image cloudName="demo" publicId="samples/food/spices" width="300" crop="scale" />
      <Channel />
      { boxDisplay === ON && <PopUpBox mouseDown={mouseDownFunction} /> }
      <PopUpButton toggleButton={clickedButton} />
      <Login /> */}
      <DragAndDrop Highlight={highlightClass} Drop={handleDrop} DragEnter={dragEnter} DragLeave={dragLeave} DragOver={dragOver} />
    </div>
  );
};

export default App;
