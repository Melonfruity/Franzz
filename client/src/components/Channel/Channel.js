import React, {} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import channelService from '../../service/channelService';
import Chat from './Container/Chat/Chat';

const Channel = ({
  channel, users, name, messages, emitSendMessage, emitDeleteMessage,
}) => {
  const createInvite = async () => {
    const inviteLink = await channelService.getInvite(channel);
    console.log(inviteLink);
    return inviteLink;
  };

  console.log(createInvite);
  return (
    <div>
      {name}
      <CopyToClipboard
        text={() => createInvite()}
      >
        <button type="button">Create Invite</button>
      </CopyToClipboard>
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
