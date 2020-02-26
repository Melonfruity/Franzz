import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import channelService from '../../../../service/channelService';


const InviteLink = ({ channel }) => {
  const [show, setShow] = useState(false);
  const [invite, setInvite] = useState({
    ready: false,
    link: '',
  });

  const handleClose = () => setShow(false);

  const createInvite = () => {
    channelService
      .getInvite(channel)
      .then(({ channelID }) => setInvite({
        ready: true,
        link: channelID,
      }))
      .then(() => { setShow(true); });
  };

  return (
    <>
      <Button className="inviteLinkModalButton" variant="primary" onClick={createInvite}>
        Create Invite Link
      </Button>

      <Modal className="inviteLinkModalContainer" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invitePopup">
            <TextField defaultValue={invite.link} />
            <CopyToClipboard
              text={invite.link}
            >
              <Button type="button">
                Copy to clipboard!
              </Button>
            </CopyToClipboard>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InviteLink;
