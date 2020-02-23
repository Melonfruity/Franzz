import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import channelService from '../../../service/channelService';
import Chat from './Container/Chat/Chat';
// modules
import './channelStyling.css';
import RightUI from './RightUI';

const Channel = ({
  channel, users, name, messages, emitSendMessage, emitDeleteMessage, locations, center, currentUser, changeVideoState, videoStates,
}) => {
  const [moduleView, changeView] = useState({
    stalkerMap: false,
    imageBox: false,
    video: false,
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
      { invite.ready ? (
        <div>
          <textarea defaultValue={invite.link} />
          <CopyToClipboard
            text={invite.link}
          >
            <button type="button">
              Copy to clipboard!
            </button>
          </CopyToClipboard>
        </div>
      ) : <button type="button" onClick={createInvite}>Create Invite Link</button>}
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
        />
        <RightUI moduleView={moduleView} changeView={changeView} changeVideoState={changeVideoState} />
      </div>
    </div>
  );
};

export default Channel;
