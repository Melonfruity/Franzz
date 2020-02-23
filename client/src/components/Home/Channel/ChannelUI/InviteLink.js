import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import { useField } from '../../../../hooks/useField';

const InviteLink = ({ invite, createInvite }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="inviteLinkModalButton" variant="primary" onClick={handleShow}>
        Create Invite Link
      </Button>

      <Modal className="inviteLinkModalContainer" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { invite.ready ? (
          <div className = "invitePopup">
            <TextField defaultValue={invite.link} />
            <CopyToClipboard
              text={invite.link}
            >
              <Button type="button">
                Copy to clipboard!
              </Button>
            </CopyToClipboard>
          </div>)
          : <Button className="inviteLinkButton" type="button" onClick={createInvite}>Generate Invite Link</Button> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default InviteLink;
