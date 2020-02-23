import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import channelService from '../../../service/channelService';


const InviteLink = ({channel}) => {
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
    invite.ready ? (
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
    ) : <button className="inviteButton" type="button" onClick={createInvite}>Invite Link</button>
  )

}

export default InviteLink