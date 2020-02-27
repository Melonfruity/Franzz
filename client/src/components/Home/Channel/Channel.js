import React, { useState } from 'react';

import Chat from './Container/Chat/Chat';
import InviteLink from './ChannelUI/InviteLink';
import RightUI from './ChannelUI/RightUI';

import './channelStyling.css';

const Channel = ({
  channel,
  userList,
  userStatus,
  name,
  messages,
  emitSendMessage,
  emitDeleteMessage,
  locations,
  center,
  currentUser,
  changeVideoState,
  videoStates,
  syncVideo,
  sendLine,
  lines,
  isGuest,
  setState,
}) => {
  const [moduleView, changeView] = useState({
    stalkerMap: false,
    imageBox: false,
    video: false,
    canvasBox: false,
  });


  return (
    <div id="channel">
      <div id="channelName">{name}</div>
      <InviteLink
        channel={channel}
      />
      <div id="chat-righUi">
        <Chat
          messages={messages}
          emitSendMessage={emitSendMessage}
          emitDeleteMessage={emitDeleteMessage}
          channel={channel}
          currentUser={currentUser}
          moduleView={moduleView}
          locations={locations}
          center={center}
          videoStates={videoStates}
          changeVideoState={changeVideoState}
          syncVideo={syncVideo}
          sendLine={sendLine}
          lines={lines}
        />
        <RightUI
          changeView={changeView}
          userList={userList}
          userStatus={userStatus}
        />
      </div>
    </div>
  );
};

export default Channel;
