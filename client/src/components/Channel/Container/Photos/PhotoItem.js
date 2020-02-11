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
          <iframe
            src={`https://player.cloudinary.com/embed/?cloud_name=jekmessaging&public_id=${publicKey}.mp4`}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        // <Video publicId={publicKey} width="100%" format="webm" />
        )}
      </div>
    </CloudinaryContext>
  );
}
