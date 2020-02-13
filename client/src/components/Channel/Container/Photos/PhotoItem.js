import React from 'react';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';


export default function PhotoItem({ publicKey, url, fileType }) {
  return (
    <CloudinaryContext cloudName="jekmessaging">
      <div>
        {fileType === 'image' && <Image publicId={url} width="100%" />}
        {fileType === 'video'
        && (
        <video width="100%" controls>
          <source src={url} type="video/webm" />
          <source src={url} type="video/mp4" />
          <source src={url} type="video/ogg" />
        </video>
        )}
      </div>
    </CloudinaryContext>
  );
}
