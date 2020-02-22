import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { mouseDownFunction } from '../Scripts/PopUpBoxScript';

let socket;
const YoutubeSync = ({ videoState }) => {
  const [url, changeUrl] = useState({
    currentUrl: videoState.url,
    finalUrl: videoState.url,
  });

  function handleOnChange(e) {
    e.preventDefault();
    changeUrl({ ...url, currentUrl: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    changeUrl({ ...url, finalUrl: url.currentUrl });
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
          currentVideo={url.finalUrl}
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
