/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';
import './videoSync.css';

const YoutubeSync = ({
  channel, videoStates, changeVideoState, syncVideo,
}) => {
  const [newUrl, setNewUrl] = useState('');

  const handleOnChange = (e) => {
    setNewUrl(e.target.value);
  };

  console.log('video', channel, videoStates[channel]);
  function handleSubmit(e) {
    e.preventDefault();
    if (newUrl) {
      let videoId = newUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      console.log('handleSubmit', ...videoId) 
      changeVideoState(videoId, channel, false, true);
    }
  }

  return (
    <div className="video-resize-box resize-box" onMouseDown={mouseDownFunction}>
      <div id="videoBox">
      {/* <div className="popup-title">Watch Together</div> */}
      <div id="video">
        <form id="changeVideoForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Enter a video link and watch with friends..." name="link" value={newUrl} onChange={handleOnChange} />
          <input type="submit" value="Submit" />
        </form>
        <YoutubeVideoPlayer
          currentVideo={videoStates[channel].url}
          changeVideoState={changeVideoState}
          paused={videoStates[channel] ? videoStates[channel].paused : false}
          played={videoStates[channel] ? videoStates[channel].played : true}
          timeStamp={videoStates[channel] ? videoStates[channel].timeStamp : 0}
          channel={channel}
          syncVideo={syncVideo}
        />
      </div>
      </div>
    </div>
  );
};

export default YoutubeSync;
