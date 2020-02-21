import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { useField } from '../../hooks/useField';

const PopupToast = ({ emitCreateChannel, emitJoinChannel, show, toggleForm }) => {
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
        <Toast show={show} onClose={() => toggleForm(false)}>
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
    </>
  );
};

export default PopupToast;