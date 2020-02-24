import React from 'react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../../Modules/Photos/ImageBox';
import StalkerMap from '../../Modules/StalkerMap/StalkerMap';
import YoutubeSync from '../../Modules/VideoSync/YoutubeSync';
import Canvas from '../../Modules/Canvas/Canvas';


import './Styling/DragAndDropBox.css';
import './Chat.css';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel, currentUser, moduleView, locations, center, videoStates, changeVideoState, syncVideo, line, state, setState,
}) => (
  <div id="chat-container">
    <TextContainer
      messages={messages}
      emitDeleteMessage={emitDeleteMessage}
      emitSendMessage={emitSendMessage}
      channelId={channel}
      currentUser={currentUser}
    />
    <Input
      emitSendMessage={emitSendMessage}
      channel={channel}
    />
    { moduleView.imageBox && (
      <ImageBox
        channelId={channel}
        emitSendMessage={emitSendMessage}
      />
    )}
    { moduleView.stalkerMap && (
    <StalkerMap
      locations={locations}
      channel={channel}
      center={center}
    />
    )}
    { moduleView.video && (
    <YoutubeSync
      channel={channel}
      videoStates={videoStates}
      changeVideoState={changeVideoState}
      viewState={moduleView.video}
      syncVideo={syncVideo}
    />
    )}
    { moduleView.canvasBox && (
      <div className="canvas resize-box">
        {/* <h3 style={{ textAlign: 'center' }}></h3> */}
        <div style={{ display: 'flex' }} className="main">
          <div style={{ width: '225px' }} className="left-guide" />
          <Canvas
            className="canvasBoard"
            line={line}
            setState={setState}
            state={state}
            channel={channel}
          />
          <div style={{ width: '185px' }} className="right-guide" />
        </div>
      </div>
    )}
  </div>
);

export default Chat;
