import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const InviteLink = ({
  invite, createInvite,
}) => (
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
);

export default InviteLink;
