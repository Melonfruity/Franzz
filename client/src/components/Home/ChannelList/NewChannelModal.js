import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

// import './NewChannelModal.css';

const Modal = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">New Channel</h1>
    </Jumbotron>
  </Container>
);

export default Modal;
