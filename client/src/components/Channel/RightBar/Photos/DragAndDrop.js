import React from 'react';
// This is a temporary file used for the outline of the chatbox
// Styling work (temporary)
// import '../Chat/Styling/DragAndDropBox.scss';

// Scripting work
import useChangeHighlightClass from '../../../../hooks/useHighlightClass';
import { preventDefaults, handleDrop, handleFiles } from '../Chat/Scripts/DragAndDropPhotos';


export default function DragAndDrop(props) {
  const { highlightClass, changeHighlightClass } = useChangeHighlightClass('');

  // Changes the class depending on the event
  function boxEvent(e) {
    changeHighlightClass(e.type);
    preventDefaults(e);
  }

  function dropFile(e) {
    changeHighlightClass(e.type);
    handleDrop(e);
  }

  return (
    <div
      id="drop-area"
      className={highlightClass}
      onDragEnter={boxEvent}
      onDragLeave={boxEvent}
      onDragOver={boxEvent}
      onDrop={dropFile}
    >
      <form className="my-form">
        <p>
          Hola guys u can upload fotos thru drag/drop and the button!!1!
        </p>
        <input type="file" id="fileElem" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
        <label className="button" htmlFor="fileElem">Select some files</label>
      </form>
    </div>
  );
}
