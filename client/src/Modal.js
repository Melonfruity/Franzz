import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'

const NewAccountRegistration = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        ->
      </Button> */}

      <Button variant="outlined" onClick={handleShow}>
        ->
      </Button>

      <Modal show={show} onHide={handleClose} className="NewAccountModal">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="NewAccountModalBody">
        <form className="NewAccountRegistrationModalForm">  
          <p>Welcome! Claim your account to keep all your servers and chats even after you close the browser.</p>
          <div className="email">
          <p>E-mail:</p>
          <input></input>
          </div>
          <div className="password">
          <p>Password: </p>
          <input></input>
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSelectUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewAccountRegistration 