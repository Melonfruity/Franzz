import React from 'react';
import {
  Image, Video, Transformation, CloudinaryContext,
} from 'cloudinary-react';


export default function PhotoItem({ url }) {
  return (
    <CloudinaryContext cloudName="jekmessaging">
      <div>
        <Image publicId={url} width="100%" />
      </div>
    </CloudinaryContext>
  );
}
