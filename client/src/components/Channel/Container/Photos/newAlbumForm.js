import React, { useState, useEffect } from 'react';
import { handleFiles, handleDrop } from '../Chat/Scripts/DragAndDropPhotos';


export default function NewAlbumForm({ cancel, channelId, emitSendMessage }) {
  const [fields, changeFields] = useState(
    {
      album: '',
      files: [],
    },
  );

  function dropFile(e) {
    handleDrop(e, channelId, false);
  }

  // Handles form events when adding files and
  // creating a name
  function handleOnChange(event) {
    if (event.target.name === 'album') {
      changeFields({
        ...fields,
        [event.target.name]: event.target.value,
      });
    } else {
      changeFields({
        album: fields.album,
        files: [...fields.files, event],
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    [...fields.files].forEach((e) => {
      console.log(e);
    });
  }

  return (
    <div>
      <button onClick={() => cancel('chat')}>Cancel</button>
      <form onSubmit={handleSubmit} onChange={handleOnChange}>
        <label>
          Album Name:
          <input type="text" name="album" />
        </label>
        <input
          id="drop-area"
          name="files"
          type="file"
          multiple
          accept="image/*"
          className="textContainer"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
