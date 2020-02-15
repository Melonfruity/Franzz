import React from 'react';


export default function newAlbumForm({ cancel }) {
  return (
    <div>
      <button onClick={()=>cancel('chat')}>Cancel</button>
      <form>
        <label>
          Album Name:
          <input type="text" name="name"></input>
        </label>
      </form>
    </div>
  );
}
