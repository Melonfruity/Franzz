import React from 'react';
import YouTube from 'react-youtube';

const YoutubeVideoPlayer = ({ currentVideo }) => {

  function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId={currentVideo}
      opts={opts}
      onReady={onReady}
    />
  );
};

export default YoutubeVideoPlayer;