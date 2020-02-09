import React from 'react';
import {
  Image, Video, Transformation, CloudinaryContext,
} from 'cloudinary-react';


export default function PhotoItem({ key, url }) {
  return (
    <CloudinaryContext cloudName="jekmessaging">
      <div>
        <Image publicId={url} width="20" />
      </div>
    </CloudinaryContext>
  );
}
