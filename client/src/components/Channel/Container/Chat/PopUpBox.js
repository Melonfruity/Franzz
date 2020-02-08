import React from 'react';
import { mouseDownFunction } from './Scripts/PopUpBoxScript';
import './Styling/PopUpBoxStyling.scss';

export default function PopUpBox(props) {
  return (
    <div id="resize-box" onMouseDown={mouseDownFunction}>
      Hellllloooo
    </div>
  );
}
