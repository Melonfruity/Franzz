import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

let player;

const YoutubeVideoPlayer = ({
  currentVideo, changeVideoState, paused, played, channel, syncVideo, timeStamp,
}) => {
  function onReady(event) {
    console.log(timeStamp)
    player = event.target;
    if (timeStamp) {
      player.seekTo(timeStamp, true);
    }
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
    if (timeStamp && player) {
      if (Math.abs(player.getCurrentTime() - timeStamp) > 1) {
        console.log(timeStamp)
        player.seekTo(timeStamp, true);
      }
    }

    return () => {
      player = null;
    };
  }, [timeStamp, played, paused]);

  function onPlayerStateChange(event) {
    player = event.target;
    const state = event.data;
    console.log('here')
    syncVideo(player.getCurrentTime(), channel);

    if (state === 1) { // if the video is playing
      changeVideoState(currentVideo, channel, false, true);
    } else if (state === 2) { // if the video is paused
      changeVideoState(currentVideo, channel, true, false);
    }
  }

  const opts = {
    height: '390',
    width: '640',
    left: '20px',
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
