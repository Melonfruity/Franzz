import React, { useState } from 'react';
import { handleFiles } from '../Chat/Scripts/DragAndDropPhotos';


export default function NewAlbumForm({ channelId, emitSendMessage }) {
  const [fields, changeFields] = useState(
    {
      album: '',
      files: [],
    },
  );

  // Handles form events when adding files and
  // creating a name
  function handleOnChange(event) {
    event.preventDefault();
    if (event.target.name === 'album') {
      changeFields({
        ...fields,
        [event.target.name]: event.target.value,
      });
    } else {
      changeFields({
        album: fields.album,
        files: [...fields.files, event.target.files],
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    [...fields.files].forEach((file) => {
      handleFiles(file, channelId, fields.album, emitSendMessage);
    });
    document.getElementById('album-upload-form').reset();
    const message = `🚨A new album '${fields.album}' has been uploaded🚨`;
    emitSendMessage(message, false, false);
    // Change view (later)
  }

  return (
    <div>
      <form id="album-upload-form" onSubmit={handleSubmit}>
        <label>
          Album Name:
          <input type="text" name="album" onChange={handleOnChange} />
        </label>
        <input
          id="drop-area"
          name="files"
          type="file"
          multiple
          accept="image/*"
          className="textContainer"
          onChange={handleOnChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
