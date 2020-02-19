import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Album from './Album';

export default function AlbumDisplay({ change, channelId, viewAlbum }) {
  const [albums, setAlbums] = useState([]);

  // gets all the albums in the channel
  useEffect(() => {
    axios.get(`http://localhost:8001/api/photos/getAlbums/${channelId}`)
      .then((res) => {
        const { folders } = res.data;
        folders.forEach((album) => {
          setAlbums((prev) => [...prev, album]);
        });
      });
  }, [channelId]);

  const allAlbums = albums.map((a) => (
    <Album
      key={a.name}
      name={a.name}
      path={a.path}
      viewAlbum={viewAlbum}
    />
  ));

  return (
    <div>
      <button onClick={() => change('albumForm')}>New Album</button>
      <h4>Albums</h4>
      <div id="album-box">
        {allAlbums}
      </div>
    </div>
  );
}
