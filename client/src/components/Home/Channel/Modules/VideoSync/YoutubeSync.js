import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';

const YoutubeSync = ({
  channel, videoStates, changeVideoState, syncVideo,
}) => {
  const [url, changeUrl] = useState({
    currentUrl: videoStates[channel] ? videoStates[channel].url : 'ScMzIvxBSi4',
    finalUrl: videoStates[channel] ? videoStates[channel].url : 'ScMzIvxBSi4',
  });

  function handleOnChange(e) {
    e.preventDefault();
    changeUrl({ ...url, currentUrl: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let videoId = url.currentUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    changeUrl((prev) => ({ ...prev, finalUrl: videoId }));
    changeVideoState(videoId, channel);
  }


  return (
    <div className="resize-box" onMouseDown={mouseDownFunction}>
      <div id="video">
        <YoutubeVideoPlayer
          currentVideo={videoStates[channel] ? videoStates[channel].url : url.finalUrl}
          changeVideoState={changeVideoState}
          paused={videoStates[channel] ? videoStates[channel].paused : false}
          played={videoStates[channel] ? videoStates[channel].played : true}
          timeStamp={videoStates[channel] ? videoStates[channel].timeStamp : 0}
          channel={channel}
          syncVideo={syncVideo}
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
