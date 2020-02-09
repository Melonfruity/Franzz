import React from 'react';
import {
  Image, Video, Transformation, CloudinaryContext,
} from 'cloudinary-react';


export default function PhotoItem({ publicKey, url, fileType }) {
  return (
    <CloudinaryContext cloudName="jekmessaging">
      <div>
        {fileType === 'image' && <Image publicId={url} width="100%" />}
        {fileType === 'video' && (
        <Video publicId={publicKey} width="100%" />
        )}
      </div>
    </CloudinaryContext>
  );
}
