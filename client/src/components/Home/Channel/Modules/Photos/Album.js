/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Image, Video, CloudinaryContext,
} from 'cloudinary-react';
import './Styling/Album.css';
import { serverURL } from '../../../../../utils/config';

export default function Album({ name, path, viewAlbum }) {
  const [cover, setCover] = useState([]);

  useEffect(() => {
    axios.get(`${serverURL}/api/photos/coverPhoto/${path}`)
      .then((res) => setCover([res.data[0], res.data[1]]));
  }, [path]);
  return (
    <div className="albumCover" onClick={() => viewAlbum(path, name)}>
      <CloudinaryContext className="coverPhoto" cloudName="jekmessaging">
        {cover[0] === 'image' && <Image publicId={cover[1]} />}
        {cover[0] === 'video' && <Video publicId={cover[1]} resourceType="video" />}
      </CloudinaryContext>
      {name}
    </div>
  );
}
