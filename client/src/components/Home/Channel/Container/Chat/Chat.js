import React, {Fragment} from 'react';
import TextContainer from './TextContainer';
import Input from './Input';
import ImageBox from '../../Modules/Photos/ImageBox';
import StalkerMap from '../../Modules/StalkerMap/StalkerMap';
import Canvas from '../../Modules/Canvas/canvas';


import './Styling/DragAndDropBox.css';
import './Chat.css';

const Chat = ({
  messages, emitDeleteMessage, emitSendMessage, channel, currentUser, moduleView, locations, center,
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
    { moduleView.canvasBox && (
      <div className="resize-box">
            {/* <h3 style={{ textAlign: 'center' }}></h3> */}
            <div className="main">
              <div className="color-guide">
                <h5>Color Guide</h5>
                <div className="user user">User</div>
                <div className="user guest">Guest</div>
              </div>
              <Canvas />
            </div>
      </div>
    )}
  </div>
);

export default Chat;
