import React, { useState } from 'react';
import channelService from '../../../service/channelService';
import Chat from './Container/Chat/Chat';
import InviteLink from './ChannelUI/InviteLink';

// modules
import './channelStyling.css';
import RightUI from './ChannelUI/RightUI';
import YoutubeSync from './Modules/VideoSync/YoutubeSync';

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
}) => {
  const [moduleView, changeView] = useState({
    stalkerMap: false,
    imageBox: false,
    canvasBox: false
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
        />
        <RightUI
          moduleView={moduleView}
          changeView={changeView}
          userList={userList}
          userStatus={userStatus}
        />
      </div>
    </div>
  );
};

export default Channel;
