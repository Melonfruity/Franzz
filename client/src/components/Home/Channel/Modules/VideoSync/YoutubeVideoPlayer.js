import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

let player = '';

const YoutubeVideoPlayer = ({
  currentVideo, changeVideoState, paused, played, channel,
}) => {
  debugger
  function onReady(event) {
    player = event.target;
    // access to player in all event handlers via event.target
    if (paused) {
      event.target.pauseVideo();
    }
    event.target.playVideo();
  }

  useEffect(() => {
    if (paused && player) {
      player.pauseVideo();
    } else if (played && player) {
      player.playVideo();
    }
  }, [paused, played]);


  function onPlayerStateChange(event) {
    const state = event.data;

    if (state == 1) { // if the video is playing
      changeVideoState(currentVideo, channel, false, true);

    } else if (state == 2) { // if the video is paused
      changeVideoState(currentVideo, channel, true, false);
    }
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
      id="youtube-player"
      videoId={currentVideo}
      opts={opts}
      onReady={onReady}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default YoutubeVideoPlayer;
