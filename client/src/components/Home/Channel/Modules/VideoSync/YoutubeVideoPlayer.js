import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

let player;

const YoutubeVideoPlayer = ({
  currentVideo, changeVideoState, paused, played, channel, syncVideo, timeStamp,
}) => {
  function onReady(event) {
    player = event.target;
    if (timeStamp && player.b) {
      player.seekTo(timeStamp, true);
    }
    syncVideo(player.getCurrentTime(), channel);
    if (paused) {
      event.target.pauseVideo();
    }
    event.target.playVideo();
  }

  useEffect(() => {
    if (paused && player && player.b) {
      player.pauseVideo();
    } else if (played && player && player.b) {
      player.playVideo();
    }
  }, [paused, played]);

  useEffect(() => {
    if (timeStamp && player && player.b) {
      if (Math.abs(player.getCurrentTime() - timeStamp) > 1) {
        player.seekTo(timeStamp, true);
      }
    }
  }, [timeStamp]);

  function onPlayerStateChange(event) {
    const state = event.data;
    syncVideo(player.getCurrentTime(), channel);

    if (state === 1) { // if the video is playing
      changeVideoState(currentVideo, channel, false, true);
    } else if (state === 2) { // if the video is paused
      changeVideoState(currentVideo, channel, true, false);
    }
  }

  const opts = {
    height: '362',
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
