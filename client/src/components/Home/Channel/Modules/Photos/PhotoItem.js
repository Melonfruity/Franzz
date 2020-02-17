import React from 'react';
import {
  Image, CloudinaryContext,
} from 'cloudinary-react';

export default function PhotoItem({
  url, fileType, showSlide, slide,
}) {
  return (
    <CloudinaryContext cloudName="jekmessaging">
      <div onClick={() => showSlide(slide)}>
        {fileType === 'image' && <Image publicId={url} width="100%"  />}
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
