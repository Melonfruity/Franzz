import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import channelService from '../../service/channelService';
import Chat from './Container/Chat/Chat';

const Channel = ({
  channel, users, name, messages, emitSendMessage, emitDeleteMessage,
}) => {
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
    <div>
      {name}
      {
        // modal this!
      }
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
      <Chat
        messages={messages}
        emitSendMessage={emitSendMessage}
        emitDeleteMessage={emitDeleteMessage}
        channel={channel}
      />
    </div>
  );
};

export default Channel;
