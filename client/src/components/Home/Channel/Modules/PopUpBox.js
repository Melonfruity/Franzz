import React from 'react';
import { mouseDownFunction } from './Scripts/PopUpBoxScript';

export default function PopUpBox(props) {
  return (
    <div id="resize-box" onMouseDown={mouseDownFunction}>
      Hellllloooo
    </div>
  );
}
