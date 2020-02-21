import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useField } from '../../../hooks/useField';

// import './NewChannelModal.css';

const PopupToast = ({ emitCreateChannel, emitJoinChannel, show }) => {
  const channelName = useField('text');
  const channelLink = useField('text');

  const createChannel = async (e) => {
    e.preventDefault();
    emitCreateChannel(channelName.value);
    channelName.reset();
  };

  const joinChannel = (e) => {
    e.preventDefault();
    emitJoinChannel(channelLink.value);
    channelLink.reset();
  };
  return (
    <>
      <div className="flexContainer">
        <Toast>
          <Toast.Header>
            <strong className="mr-auto">New Channel</strong>
          </Toast.Header>
          <Toast.Body>
            <div className="seperate">
              <form>
                <input
                  {...channelName}
                  reset={undefined}
                  placeholder="channel name"
                  onKeyPress={(e) => (e.key === 'Enter' ? createChannel(e) : null)}
                />
                <button type="button" onClick={(e) => createChannel(e)}>
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
                <button type="button" onClick={(e) => joinChannel(e)}>
                Join
                </button>
              </form>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
};

const Modal = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">New Channel</h1>
    </Jumbotron>
  </Container>
);

export default Modal;
