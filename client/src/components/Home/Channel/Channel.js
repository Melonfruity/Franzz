import React, { useState } from 'react';

import channelService from '../../../service/channelService';

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
}) => {
  const [moduleView, changeView] = useState({
    stalkerMap: false,
    imageBox: false,
    video: false,
    canvasBox: false,
  });

  const [invite, setInvite] = useState({
    ready: false,
    link: '',
  });

  const createInvite = () => {
    channelService
      .getInvite(channel)
      .then(({ channelID }) => setInvite({
        ready: true,
        link: channelID,
      }));
  };

  return (
    <div id="channel">
      {name}
      <InviteLink
        channel={channel}
        createInvite={createInvite}
        invite={invite}
        setInvite={setInvite}
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
