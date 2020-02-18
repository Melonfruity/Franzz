import React, { useState } from 'react';
import { useField } from '../../hooks/useField';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './Modal.css';

const PopupToast = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      <div className="flexContainer">
      {!show && <Button className="modalButton" onClick={() => toggleShow(true)}>Create New Channel</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">New Channel</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
      </div>
    </>
  );
};

const Modal = ({ emitCreateChannel, emitJoinChannel }) => {


  const channelName = useField('text');
  const channelLink = useField('text');

  const createChannel = (e) => {
    e.preventDefault();
    emitCreateChannel(channelName.value);
    channelName.reset();
  };

  const joinChannel = (e) => {
    e.preventDefault();
    emitJoinChannel((channelLink.value));
    channelLink.reset();
  };

  return (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">New Channel</h1>
      <PopupToast className="toast">
      <div className="seperate">
      <form>  
      <input
        {...channelName}
        reset={undefined}
        placeholder="channel name"
        onKeyPress={(e) => (e.key === 'Enter' ? createChannel(e) : null)}
      />
        <button onClick={(e) => createChannel(e)}>
          Create
        </button>
      </form>
      <form>
      <input
        {...channelLink}
        reset={undefined}
        placeholder="channel link"
        onKeyPress={(e) => (e.key === 'Enter' ? joinChannel(e) : null)}
      />
        <button onClick={(e) => joinChannel(e)}>
          Join
        </button>
      </form>
      </div>
      </PopupToast>
    </Jumbotron>
  </Container>
  )
};

export default Modal;