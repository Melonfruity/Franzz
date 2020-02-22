import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import JoinCreateChannelInput from './JoinCreateChannelInput';
import { useField } from '../../hooks/useField';

const PopupToast = ({
  emitCreateChannel, emitJoinChannel, show, toggleForm,
}) => {
  const channelName = useField('text');
  const channelLink = useField('text');

  const handleClose = () => toggleForm(false);
  const handleShow = () => toggleForm(true);


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
      <Modal className="newChannelModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="seperate">
            <form className="createChannelForm">
              <p style={{
                textAlign: 'center', fontSize: '20px', color: 'rgb(60, 163, 116)', margin: '0',
              }}
              >
CREATE
              </p>
              <p style={{ textAlign: 'center', fontSize: '12px' }}>Create a new server and invite your friends!</p>
              <div className="createChannelImageContainer">
                <div className="joinChannelImage" />
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
              <button className="createChannelButton" type="button" onClick={(e) => createChannel(e)}>
                Create
              </button>
            </form>
            <form className="joinChannelForm">
              <p style={{
                textAlign: 'center', fontSize: '20px', color: 'rgb(114, 137, 218)', margin: '0',
              }}
              >
JOIN
              </p>
              <p style={{ textAlign: 'center', fontSize: '12px' }}>Enter an invite and join your friends server!</p>
              <div className="createChannelImageContainer">
                <div className="createChannelImage" />
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
              <button className="joinChannelButton" type="button" onClick={(e) => joinChannel(e)}>
                Join
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupToast;
