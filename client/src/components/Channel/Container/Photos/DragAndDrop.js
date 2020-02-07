import React from 'react';

export default function DragAndDrop({
  Highlight, DragEnter, DragLeave, DragOver, Drop,
}) {
  return (
    <div
      id="drop-area"
      className={Highlight}
      onDragEnter={DragEnter}
      onDragLeave={DragLeave}
      onDragOver={DragOver}
      onDrop={Drop}
    >
      <form className="my-form">
        <p>
          Hola guys u can upload fotos thru drag/drop and the button!!1!
          <h5>Mega WOW!!</h5>
        </p>
        <input type="file" id="fileElem" multiple accept="image/*" onChange="handleFiles(this.files)" />
        <label className="button" htmlFor="fileElem">Select some files</label>
      </form>
    </div>
  );
}
