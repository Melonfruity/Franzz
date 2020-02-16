import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styling/albumStyling.scss';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';

export default function Album({ name, path }) {
  const [cover, setCover] = useState('');

  console.log(cover);
  useEffect(() => {
    axios.get(`http://localhost:8001/api/photos/coverPhoto/${path}`)
      .then((res) => setCover(res.data));
  }, [path]);
  return (
    <div className="albumCover">
      <div className="coverPhoto">
        <CloudinaryContext cloudName="jekmessaging">
          <Image publicId={cover} width="80%" />
        </CloudinaryContext>
      </div>
      {name}
    </div>
  );
}
