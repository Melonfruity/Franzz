import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const NewChannelModal = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="newChannelHeader">New Channel</h1>
    </Jumbotron>
  </Container>
);

export default NewChannelModal;
