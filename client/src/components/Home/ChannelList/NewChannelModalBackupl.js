import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import JoinCreateChannelInput from './JoinCreateChannelInput';
import { useField } from '../../../hooks/useField';

import './NewChannelModal.css';

const PopupToast = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      <div className="flexContainer">
        {!show && <Button className="modalButton" onClick={() => toggleShow(true)}>+</Button>}
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
    <Container className="p-3">
      <Jumbotron className="jumbotron">
        <h1 className="header">New Channel</h1>
        <PopupToast className="toast">
          <div className="seperate">
            <form className="createChannelForm">
            <p style={{textAlign:'center', fontSize: '20px',color:'rgb(60, 163, 116)',margin:'0'}}>CREATE</p>
            <p style={{textAlign:'center', fontSize:'12px'}}>Create a new server and invite your friends!</p>
              <div className="createChannelImageContainer">
              <div className="joinChannelImage">
              </div>
              </div>
                {/* <JoinCreateChannelInput
                {...channelName}
                reset={undefined}
                name="Channel Name"
                placeholder="Channel Name"
                createChannel={createChannel}
                id="outlined-basic" 
                label="Channel Name" 
                variant="outlined">
                </JoinCreateChannelInput> */}
              <input
                {...channelName}
                reset={undefined}
                placeholder="Channel Name"
                onKeyPress={(e) => (e.key === 'Enter' ? createChannel(e) : null)}
              />
              <button className='createChannelButton' type="button" onClick={(e) => createChannel(e)}>
                Create
              </button>
            </form>
            <form className="joinChannelForm">
              <p style={{textAlign:'center', fontSize: '20px', color:'rgb(114, 137, 218)',margin:'0'}}>JOIN</p>
              <p style={{textAlign:'center', fontSize:'12px'}}>Enter an invite and join your friends server!</p>
              <div className="createChannelImageContainer">
              <div className="createChannelImage">
              </div>
              </div>
              {/* <JoinCreateChannelInput
                {...channelLink}
                reset={undefined}
                name="Channel Link"
                handleJoinCreate={joinChannel}
                placeholder="Channel Link"
                id="outlined-basic" 
                label="Channel Link" 
                variant="outlined" >
                </JoinCreateChannelInput> */}
              <input
                {...channelLink}
                reset={undefined}
                placeholder="Channel Link"
                onKeyPress={(e) => (e.key === 'Enter' ? joinChannel(e) : null)}
              />
              <button className='joinChannelButton' type="button" onClick={(e) => joinChannel(e)}>
                Join
              </button>
            </form>
          </div>
        </PopupToast>
      </Jumbotron>
    </Container>
  );
};

export default Modal;
