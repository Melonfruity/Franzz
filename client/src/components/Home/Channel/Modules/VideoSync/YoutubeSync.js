import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';

const YoutubeSync = ({ channel, videoStates, changeVideoState, viewState }) => {
  const [url, changeUrl] = useState({
    currentUrl: videoStates[channel] ? videoStates[channel].url : '8xYDo0hQ5RI',
    finalUrl: videoStates[channel] ? videoStates[channel].url : '8xYDo0hQ5RI',
  });

  console.log(videoStates[channel])
  function handleOnChange(e) {
    e.preventDefault();
    changeUrl({ ...url, currentUrl: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    changeVideoState(url.currentUrl, channel, false, true);
  }

  const temporaryStyle = {
    display: 'flex',
    'flex-direction': 'column',
    height: '100%',
  };
  return (
    <div className="resize-box" onMouseDown={mouseDownFunction}>
      <div style={temporaryStyle}>
        <YoutubeVideoPlayer
          currentVideo={videoStates[channel] ? videoStates[channel].url : url.finalUrl}
          changeVideoState={changeVideoState}
          paused={videoStates[channel] ? videoStates[channel].paused : false}
          played={videoStates[channel] ? videoStates[channel].played : true}
          channel={channel}
        />
        <form id="changeVideoForm" onSubmit={handleSubmit}>
          <label>
          New video:
            <input type="text" placeholer="Enter a video link" name="link" onChange={handleOnChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default YoutubeSync;
