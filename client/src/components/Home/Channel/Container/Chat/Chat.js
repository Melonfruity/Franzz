import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../../Modules/Photos/ImageBox';
import StalkerMap from '../../Modules/StalkerMap/StalkerMap';
import YoutubeSync from '../../Modules/VideoSync/YoutubeSync';
import Canvas from '../../Modules/Canvas/Canvas';

import './Styling/DragAndDropBox.css';
import './Chat.css';

const Chat = ({
  messages,
  emitDeleteMessage,
  emitSendMessage,
  channel,
  currentUser,
  moduleView,
  locations,
  center,
  videoStates,
  changeVideoState,
  syncVideo,
  sendLine,
  lines,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setMessage((prev) => prev.concat(emojiObject.emoji));
  };

  return (
    <div id="chat-container">
      <TextContainer
        messages={messages}
        emitDeleteMessage={emitDeleteMessage}
        emitSendMessage={emitSendMessage}
        channelId={channel}
        currentUser={currentUser}
      />
      <Input
        setShowEmojiPicker={setShowEmojiPicker}
        emitSendMessage={emitSendMessage}
        channel={channel}
        message={message}
        setMessage={setMessage}
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
          <div style={{ display: 'flex' }} className="main">
            <div style={{ width: '225px' }} className="left-guide" />
            <Canvas
              className="canvasBoard"
              sendLine={sendLine}
              lines={lines}
              currentUser={currentUser}
            />
            <div style={{ width: '185px' }} className="right-guide" />
          </div>
        </div>
      )}
      { showEmojiPicker && (<div className="emojiPicker"><Picker onEmojiClick={onEmojiClick} /></div>)}
    </div>
  );
};

// onEmojiClick
export default Chat;
