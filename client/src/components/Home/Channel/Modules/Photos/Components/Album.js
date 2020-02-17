import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';

export default function Album({ name, path, viewAlbum }) {
  const [cover, setCover] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8001/api/photos/coverPhoto/${path}`)
      .then((res) => setCover(res.data));
  }, [path]);
  return (
    <div className="albumCover" onClick={() => viewAlbum(path, name)}>
      <CloudinaryContext className="coverPhoto" cloudName="jekmessaging">
        <Image publicId={cover} width="80%" />
      </CloudinaryContext>
      {name}
    </div>
  );
}
