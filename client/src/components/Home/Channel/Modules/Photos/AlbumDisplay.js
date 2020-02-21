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
      name={a.name.replace(/-/g, ' ')}
      path={a.path}
      viewAlbum={viewAlbum}
    />
  ));

  return (
    <div>
      <div className="popup-title">Albums</div>
        <button className="adding-button" onClick={() => change('albumForm')}>+<span></span></button>
      <div id="album-box">
        {allAlbums}
      </div>
    </div>
  );
}
