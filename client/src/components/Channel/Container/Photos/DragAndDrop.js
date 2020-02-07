import React from 'react';


export default function DragAndDrop({ DragEnter, DragLeave, DragOver, Drop }) {
  return (
    <div
      id="drop-area"
      onDragEnter={DragEnter}
      onDragLeave={DragLeave}
      onDragOver={DragOver}
      onDrop={Drop}
    >
      <form className="my-form">
        <p>
          Upload multiple files with the file dialog or by dragging and dropping
          images onto the dashed region
        </p>
        <input type="file" id="fileElem" multiple accept="image/*" onChange="handleFiles(this.files)" />
        <label className="button" htmlFor="fileElem">Select some files</label>
      </form>
    </div>
  );
}
