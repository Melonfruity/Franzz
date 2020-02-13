import React, { useState } from 'react';

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

const Modal = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">New Channel</h1>
      <PopupToast className="toast">
      <div className="seperate">
      <form>  
        <input placeholder="Channel Name"> 

        </input>
        <button>
          Create
        </button>
      </form>
      <form>
        <input placeholder="Channel Link">

        </input>
        <button>
          Join
        </button>
      </form>
      </div>
      </PopupToast>
    </Jumbotron>
  </Container>
);

export default Modal;
